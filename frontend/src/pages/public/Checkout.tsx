import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartStore } from "@/stores/useCartStore"
import { toast } from "sonner"
import { useState, useMemo, useEffect, useRef } from "react"
import { calculateFreight, getAddressByCep } from "@/lib/freight"
import { Loader2, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCartStore();
  const totalItems = cartTotal();
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [shippingValue, setShippingValue] = useState<number | null>(null);
  const [loadingFreight, setLoadingFreight] = useState(false);

  // Estados do Formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numero, setNumero] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const commonDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com.br", "icloud.com", "live.com"];

  // Calcula sugestão de e-mail
  const getEmailSuggestion = (value: string) => {
    if (!value.includes("@")) return null;
    const [local, domain] = value.split("@");
    if (!domain) return "gmail.com"; // Sugestão padrão ao digitar apenas @
    
    const suggestion = commonDomains.find(d => d.startsWith(domain.toLowerCase()));
    if (suggestion && suggestion !== domain.toLowerCase()) return suggestion;
    return null;
  };

  // Verifica se um campo está inválido para exibição visual
  const isFieldInvalid = (name: string, value: string) => {
    if (!touched[name]) return false;
    const feedback = getFieldFeedback(name, value);
    return feedback && !feedback.includes("validado") && !feedback.includes("formato correto") && !feedback.includes("preenchido") && !feedback.includes("pronto");
  };

  // Algoritmo de Validação de CPF
  const isValidCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    
    let sum = 0;
    let rest;
    
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  };

  // Validação em Tempo Real
  const getFieldFeedback = (name: string, value: string) => {
    if (!value) return null;
    
    switch (name) {
      case "nome":
        const nameParts = value.trim().split(/\s+/).filter(part => part.length >= 2);
        if (nameParts.length < 2) return "Digite nome e sobrenome (ex: João Silva)";
        return "Nome completo validado";
      case "cpf":
        const cleanCpf = value.replace(/\D/g, "");
        if (cleanCpf.length < 11) return `Faltam ${11 - cleanCpf.length} dígitos no CPF`;
        if (cleanCpf.length === 11) {
          return isValidCPF(cleanCpf) ? "CPF válido e verificado" : "CPF inválido";
        }
        return "CPF inválido";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Digite um e-mail válido (ex@ex.com)" : "E-mail validado";
      case "telefone":
        const cleanTel = value.replace(/\D/g, "");
        if (cleanTel.length < 10) return "Digite DDD + Número (mínimo 10 dígitos)";
        return "Telefone em formato válido";
      case "cep":
        const cleanCep = value.replace(/\D/g, "");
        if (cleanCep.length < 8) return `Faltam ${8 - cleanCep.length} dígitos no CEP`;
        return cleanCep.length === 8 ? "CEP pronto para consulta" : "CEP incompleto";
      case "numero":
        return value.trim().length === 0 ? "O número é obrigatório" : "Número preenchido";
      default:
        return null;
    }
  };

  const ValidationTooltip = ({ field, value }: { field: string; value: string }) => {
    const feedback = getFieldFeedback(field, value);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (focusedField === field && feedback) {
        setVisible(true);
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      } else {
        setVisible(false);
      }

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [value, focusedField, feedback]);

    if (!visible || !feedback) return null;

    const isValid = feedback.includes("válido") || feedback.includes("ok") || feedback.includes("validado");

    return (
      <div className="absolute -top-7 left-2 z-50 animate-in fade-in slide-in-from-bottom-1 duration-200">
        <div className={cn(
          "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border",
          isValid 
            ? "bg-gray-100 text-gray-500 border-gray-200" 
            : "bg-gray-100 text-gray-600 border-gray-200"
        )}>
          {feedback}
        </div>
        <div className="absolute -bottom-1 left-3 w-2 h-2 bg-gray-100 border-r border-b border-gray-200 transform rotate-45"></div>
      </div>
    );
  };

  // Máscaras de Entrada
  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  // Busca automática ao digitar 8 dígitos
  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      handleCalculateFreight();
    } else {
      setShippingValue(null);
    }
  }, [cep]);

  const totalWeight = useMemo(() =>
    cartItems.reduce((acc, item) => acc + (item.weight || 0.5) * item.quantity, 0),
    [cartItems]
  );

  const finalShipping = useMemo(() => {
    if (totalItems > 250) return 0;
    return shippingValue || 0;
  }, [totalItems, shippingValue]);

  // Desconto somente se for PIX
  const discountAmount = useMemo(() => {
    if (paymentMethod === 'pix') {
      return (totalItems + finalShipping) * 0.05;
    }
    return 0;
  }, [paymentMethod, totalItems, finalShipping]);

  const grandTotal = (totalItems + finalShipping) - discountAmount;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (nome.trim().split(" ").length < 2) newErrors.nome = "Digite seu nome completo";
    if (cpf.replace(/\D/g, "").length !== 11) newErrors.cpf = "CPF inválido (necessário 11 dígitos)";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "E-mail inválido";
    if (telefone.replace(/\D/g, "").length < 10) newErrors.telefone = "Telefone inválido (ex: (11) 99999-9999)";
    if (cep.replace(/\D/g, "").length !== 8) newErrors.cep = "CEP incompleto";
    if (!endereco) newErrors.endereco = "Aguardando localização pelo CEP";
    if (!numero) newErrors.numero = "Obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculateFreight = async () => {
    setLoadingFreight(true);
    setErrors(prev => ({ ...prev, cep: "" }));
    try {
      const addrData = await getAddressByCep(cep);
      setEndereco(addrData.logradouro);
      setBairro(addrData.bairro);
      setCidade(addrData.localidade);
      setEstado(addrData.uf);
      setErrors(prev => ({ ...prev, endereco: "" }));

      const result = await calculateFreight(cep);
      setShippingValue(result.valor);
      toast.success("Frete atualizado!");
    } catch (error: any) {
      setShippingValue(null);
      setErrors(prev => ({ ...prev, cep: "CEP não encontrado" }));
    } finally {
      setLoadingFreight(false);
    }
  };

  const handleConfirm = (e: React.MouseEvent) => {
    if (!validate()) {
      e.preventDefault();
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }
    toast.success("Pedido realizado com sucesso!");
    clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <h1 className="col-span-full text-center text-2xl font-black tracking-tighter uppercase text-primary mb-2 md:mb-4">Finalizar Compra</h1>

        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <Card className="shadow-lg border-muted/20">
            <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">1. Identificação Pessoal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 group relative">
                  <Label htmlFor="nome" className={cn("text-xs font-bold uppercase tracking-tighter transition-colors", (errors.nome || isFieldInvalid("nome", nome)) ? "text-destructive" : "text-muted-foreground")}>Nome Completo</Label>
                  <ValidationTooltip field="nome" value={nome} />
                  <Input
                    id="nome"
                    placeholder="Ex: João da Silva"
                    className={cn(
                      "h-11 border-muted-foreground/20 focus:border-primary transition-all rounded-xl", 
                      (errors.nome || isFieldInvalid("nome", nome)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                    value={nome}
                    onFocus={() => setFocusedField("nome")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, nome: true }));
                    }}
                    onChange={(e) => {
                      setNome(e.target.value);
                      if (!touched.nome) setTouched(prev => ({ ...prev, nome: true }));
                    }}
                  />
                  {errors.nome && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.nome}</p>}
                </div>
                <div className="space-y-2 group relative">
                  <Label htmlFor="cpf" className={cn("text-xs font-bold uppercase tracking-tighter transition-colors", (errors.cpf || isFieldInvalid("cpf", cpf)) ? "text-destructive" : "text-muted-foreground")}>CPF</Label>
                  <ValidationTooltip field="cpf" value={cpf} />
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    className={cn(
                      "h-11 border-muted-foreground/20 focus:border-primary transition-all rounded-xl", 
                      (errors.cpf || isFieldInvalid("cpf", cpf)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                    value={cpf}
                    onFocus={() => setFocusedField("cpf")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, cpf: true }));
                    }}
                    onChange={(e) => {
                      setCpf(maskCPF(e.target.value));
                      if (e.target.value.length > 5) setTouched(prev => ({ ...prev, cpf: true }));
                    }}
                  />
                  {errors.cpf && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.cpf}</p>}
                </div>
              </div>
              <div className="space-y-2 group relative">
                <Label htmlFor="email" className={cn("text-xs font-bold uppercase tracking-tighter transition-colors", (errors.email || isFieldInvalid("email", email)) ? "text-destructive" : "text-muted-foreground")}>E-mail</Label>
                <ValidationTooltip field="email" value={email} />
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    className={cn(
                      "h-11 border-muted-foreground/20 focus:border-primary transition-all rounded-xl", 
                      (errors.email || isFieldInvalid("email", email)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                    value={email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, email: true }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const suggestion = getEmailSuggestion(email);
                        if (suggestion) {
                          e.preventDefault();
                          const [local] = email.split("@");
                          setEmail(`${local}@${suggestion}`);
                          toast.info(`E-mail completado para ${suggestion}`, { duration: 2000 });
                        }
                      }
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {email.includes("@") && getEmailSuggestion(email) && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground/40 pointer-events-none uppercase">
                      Enter p/ @{getEmailSuggestion(email)}
                    </span>
                  )}
                </div>
                {errors.email && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.email}</p>}
              </div>
              <div className="space-y-2 group relative">
                <Label htmlFor="telefone" className={cn("text-xs font-bold uppercase tracking-tighter transition-colors", (errors.telefone || isFieldInvalid("telefone", telefone)) ? "text-destructive" : "text-muted-foreground")}>Número de Celular</Label>
                <ValidationTooltip field="telefone" value={telefone} />
                <Input
                  id="telefone"
                  placeholder="(11) 98765-4321"
                  className={cn(
                    "h-11 border-muted-foreground/20 focus:border-primary transition-all rounded-xl", 
                    (errors.telefone || isFieldInvalid("telefone", telefone)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                  )}
                  value={telefone}
                  onFocus={() => setFocusedField("telefone")}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched(prev => ({ ...prev, telefone: true }));
                  }}
                  onChange={(e) => setTelefone(maskPhone(e.target.value))}
                />
                {errors.telefone && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.telefone}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-muted/20">
            <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">2. Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2 group relative">
                  <Label htmlFor="cep" className={cn("text-xs font-bold uppercase tracking-tighter transition-colors", (errors.cep || isFieldInvalid("cep", cep)) ? "text-destructive" : "text-muted-foreground")}>CEP</Label>
                  <ValidationTooltip field="cep" value={cep} />
                  <div className="relative">
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      className={cn(
                        "h-11 border-muted-foreground/20 focus:border-primary transition-all rounded-xl pr-10", 
                        (errors.cep || isFieldInvalid("cep", cep)) && "border-destructive focus:border-destructive"
                      )}
                      value={cep}
                      onFocus={() => setFocusedField("cep")}
                      onBlur={() => {
                        setFocusedField(null);
                        setTouched(prev => ({ ...prev, cep: true }));
                      }}
                      onChange={(e) => setCep(maskCEP(e.target.value))}
                      maxLength={9}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {loadingFreight ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <MapPin className={cn("h-4 w-4", (errors.cep || isFieldInvalid("cep", cep)) ? "text-destructive" : "text-muted-foreground/40")} />}
                    </div>
                  </div>
                  {errors.cep && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.cep}</p>}
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-2 group">
                  <Label htmlFor="endereco" className={cn("text-xs font-bold uppercase tracking-tighter transition-colors", errors.endereco ? "text-destructive" : "text-muted-foreground")}>Logradouro</Label>
                  <Input
                    id="endereco"
                    placeholder="Digite o CEP acima"
                    readOnly
                    className={cn("h-11 bg-muted/20 border-muted-foreground/20 rounded-xl cursor-not-allowed", errors.endereco && "border-destructive")}
                    value={endereco}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2 group relative">
                  <Label htmlFor="numero" className={cn("text-xs font-bold uppercase tracking-tighter transition-colors", (errors.numero || isFieldInvalid("numero", numero)) ? "text-destructive" : "text-muted-foreground")}>Número</Label>
                  <ValidationTooltip field="numero" value={numero} />
                  <Input
                    id="numero"
                    placeholder="Ex: 123"
                    className={cn(
                      "h-11 border-muted-foreground/20 focus:border-primary transition-all rounded-xl", 
                      (errors.numero || isFieldInvalid("numero", numero)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                    value={numero}
                    onFocus={() => setFocusedField("numero")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, numero: true }));
                    }}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                  {errors.numero && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.numero}</p>}
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-2 group">
                  <Label htmlFor="bairro" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Bairro</Label>
                  <Input id="bairro" readOnly value={bairro} className="h-11 bg-muted/20 border-muted-foreground/20 rounded-xl cursor-not-allowed" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <Label htmlFor="cidade" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Cidade</Label>
                  <Input id="cidade" readOnly value={cidade} className="h-11 bg-muted/20 border-muted-foreground/20 rounded-xl cursor-not-allowed" />
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="estado" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Estado</Label>
                  <Input id="estado" readOnly value={estado} className="h-11 bg-muted/20 border-muted-foreground/20 rounded-xl cursor-not-allowed" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-muted/20 overflow-hidden">
            <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">3. Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={cn(
                    "border-2 rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center space-y-2 transition-all duration-500",
                    paymentMethod === 'pix'
                      ? "border-primary bg-primary/5 text-primary scale-105 shadow-md"
                      : "border-muted text-muted-foreground hover:border-primary/50"
                  )}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <span className="text-lg font-black tracking-tighter uppercase">PIX</span>
                  <span className={cn(
                    "text-[10px] font-black uppercase text-center",
                    paymentMethod === 'pix' ? "text-success animate-pulse" : "opacity-60"
                  )}>
                    Menor Preço (-5% OFF)
                  </span>
                </div>

                <div
                  className={cn(
                    "border-2 rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center space-y-2 transition-all duration-500",
                    paymentMethod === 'card'
                      ? "border-primary bg-primary/5 text-primary scale-105 shadow-md"
                      : "border-muted text-muted-foreground hover:border-primary/50"
                  )}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span className="text-lg font-black tracking-tighter uppercase text-center">Crédito ou Débito</span>
                  <span className={cn(
                    "text-[10px] font-black uppercase",
                    paymentMethod === 'card' ? "text-primary/70" : "opacity-60"
                  )}>
                    Até 12x Sem Juros
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <div className="bg-card p-8 rounded-2xl border-2 border-muted/50 shadow-2xl space-y-6 sticky top-24 transform transition-transform hover:shadow-primary/5">
            <h3 className="text-2xl font-black tracking-tighter uppercase border-b pb-4">Resumo Final</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex-1">
                    <p className="font-bold text-sm line-clamp-1 leading-none mb-1">{item.name}</p>
                    <div className="flex gap-2">
                      <span className="text-[9px] font-black uppercase bg-secondary/10 text-secondary px-2 py-0.5 rounded">Tamanho {item.selectedSize}</span>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase">{item.quantity} unidades</span>
                    </div>
                  </div>
                  <span className="font-black text-sm tabular-nums whitespace-nowrap">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t text-sm font-medium text-muted-foreground">
              {/* 1. Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-foreground">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalItems)}</span>
              </div>

              {/* 2. Frete */}
              <div className="flex justify-between">
                <span>Taxa de Entrega</span>
                <span className={cn(
                  "tabular-nums",
                  finalShipping === 0 ? "text-success font-bold" : "text-foreground"
                )}>
                  {totalItems > 250 || (shippingValue === 0) ? "Grátis" : shippingValue ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingValue) : "--"}
                </span>
              </div>

              {/* 3. Descontos */}
              {discountAmount > 0 && (
                <div className="flex justify-between text-success animate-in fade-in zoom-in-95">
                  <span>Desconto Especial (PIX)</span>
                  <span className="tabular-nums font-bold">- {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(discountAmount)}</span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t-2 flex flex-col items-end gap-1">
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total a pagar agora</span>
              <span className="text-4xl font-black text-primary tabular-nums tracking-tighter drop-shadow-sm">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grandTotal)}
              </span>
            </div>

            <Button className="w-full bg-success hover:bg-green-600 h-16 shadow-xl rounded-full uppercase font-black tracking-widest mt-4 text-lg active:scale-95 transition-all group overflow-hidden relative" onClick={handleConfirm} asChild>
              <Link to="/customer">
                <span className="relative z-10 flex items-center"><CheckCircle className="mr-3 h-5 w-5" /> Finalizar Pedido</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mt-2">
              <span className="h-1.5 w-1.5 bg-success rounded-full animate-ping"></span> Compra 100% Protegida
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
