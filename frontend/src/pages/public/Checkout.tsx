import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MapPin, CreditCard, CheckCircle2, Plus } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useCartStore } from "@/stores/useCartStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"
import { useState, useMemo, useEffect, useRef } from "react"
import { calculateFreight, getAddressByCep } from "@/lib/freight"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCartStore();
  const { cards, personalInfo } = useAuthStore();
  const totalItems = cartTotal();
  const [cep, setCep] = useState(personalInfo?.cep || "");
  const [endereco, setEndereco] = useState(personalInfo?.endereco || "");
  const [bairro, setBairro] = useState(personalInfo?.bairro || "");
  const [cidade, setCidade] = useState(personalInfo?.cidade || "");
  const [estado, setEstado] = useState(personalInfo?.estado || "");
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isPaymentOptionOpen, setIsPaymentOptionOpen] = useState(false);
  const [cardPaymentType, setCardPaymentType] = useState<'debit' | 'credit'>('credit');
  const [installments, setInstallments] = useState(1);
  const [hasSelectedInstallments, setHasSelectedInstallments] = useState(false);
  const [shippingValue, setShippingValue] = useState<number | null>(null);
  const [loadingFreight, setLoadingFreight] = useState(false);

  // Define cartão padrão ao carregar ou mudar método
  useEffect(() => {
    if (paymentMethod === 'card' && cards.length > 0 && !selectedCardId) {
      const defaultCard = cards.find(c => c.isDefault) || cards[0];
      setSelectedCardId(defaultCard.id);
    }
  }, [paymentMethod, cards]);

  // Estados do Formulário
  const [nome, setNome] = useState(personalInfo?.name || "");
  const [cpf, setCpf] = useState(personalInfo?.cpf || "");
  const [email, setEmail] = useState(personalInfo?.email || "");
  const [telefone, setTelefone] = useState(personalInfo?.phone || "");
  const [numero, setNumero] = useState(personalInfo?.numero || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const commonDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com.br", "icloud.com", "live.com"];

  // Calcula sugestão de e-mail
  const getEmailSuggestion = (value: string) => {
    if (!value.includes("@")) return null;
    const [, domain] = value.split("@");
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
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (paymentMethod === 'card' && cardPaymentType === 'credit' && !hasSelectedInstallments) {
      toast.error("Por favor, selecione as parcelas do cartão.");
      setIsPaymentOptionOpen(true);
      return;
    }
    if (paymentMethod === 'pix') {
      navigate('/checkout/pix');
      return;
    }
    toast.success("Pedido realizado com sucesso!");
    navigate('/checkout/success');
  };

  const installmentsOptions = [1, 2, 3, 4];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 💳 Modal de Opções do Cartão */}
      {isPaymentOptionOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background border border-border/40 rounded-2xl shadow-2xl p-8 w-[95%] max-w-[400px] relative animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <CreditCard className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-black tracking-tighter uppercase">Opções do Cartão</h2>
              <p className="text-muted-foreground text-xs font-medium">Como deseja realizar o pagamento?</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setCardPaymentType('debit')}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2",
                    cardPaymentType === 'debit' ? "border-primary bg-primary/5 text-primary" : "border-muted hover:border-primary/30"
                  )}
                >
                  <span className="text-xs font-black uppercase tracking-widest">Débito</span>
                  <span className="text-[8px] font-bold uppercase opacity-60">À Vista</span>
                </button>
                <button 
                  onClick={() => setCardPaymentType('credit')}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2",
                    cardPaymentType === 'credit' ? "border-primary bg-primary/5 text-primary" : "border-muted hover:border-primary/30"
                  )}
                >
                  <span className="text-xs font-black uppercase tracking-widest">Crédito</span>
                  <span className="text-[8px] font-bold uppercase opacity-60">Parcelado</span>
                </button>
              </div>

              {cardPaymentType === 'credit' && (
                <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Parcelas (Sem Juros)</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {installmentsOptions.map(num => (
                      <button 
                        key={num}
                        onClick={() => setInstallments(num)}
                        className={cn(
                          "w-full flex justify-between items-center px-4 py-3 rounded-xl border-2 transition-all",
                          installments === num ? "border-primary bg-primary/5 text-primary" : "border-muted hover:border-primary/30"
                        )}
                      >
                        <span className="text-xs font-bold">{num}x de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grandTotal / num)}</span>
                        {installments === num && <CheckCircle2 className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={() => {
                  setHasSelectedInstallments(true);
                  setIsPaymentOptionOpen(false);
                }}
                className="w-full h-12 bg-primary hover:bg-orange-600 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg mt-4"
              >
                Confirmar Opção
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-2">
          <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase text-foreground">
            Finalizar Compra
          </h1>
          <div className="h-1 w-20 bg-primary"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <Card className="shadow-lg border-muted/20">
            <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">1. Identificação Pessoal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-4">
                <div className="md:col-span-5 space-y-1 group relative">
                  <Label htmlFor="nome" className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", (errors.nome || isFieldInvalid("nome", nome)) ? "text-destructive" : "text-muted-foreground/80")}>Nome Completo</Label>
                  <ValidationTooltip field="nome" value={nome} />
                  <Input
                    id="nome"
                    placeholder="Ex: João da Silva"
                    className={cn(
                      "h-9 border-muted-foreground/20 focus:border-primary transition-all text-[11px]", 
                      (errors.nome || isFieldInvalid("nome", nome)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                    value={nome}
                    onFocus={() => setFocusedField("nome")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, nome: true }));
                    }}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[0-9]/g, '');
                      setNome(value);
                      if (errors.nome) setErrors(prev => ({ ...prev, nome: "" }));
                      if (!touched.nome) setTouched(prev => ({ ...prev, nome: true }));
                    }}
                  />
                  {errors.nome && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.nome}</p>}
                </div>
                <div className="md:col-span-2 space-y-1 group relative">
                  <Label htmlFor="cpf" className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", (errors.cpf || isFieldInvalid("cpf", cpf)) ? "text-destructive" : "text-muted-foreground/80")}>CPF</Label>
                  <ValidationTooltip field="cpf" value={cpf} />
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    className={cn(
                      "h-9 border-muted-foreground/20 focus:border-primary transition-all text-[11px] px-2 tracking-tighter", 
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
                      if (errors.cpf) setErrors(prev => ({ ...prev, cpf: "" }));
                      if (e.target.value.length > 5) setTouched(prev => ({ ...prev, cpf: true }));
                    }}
                  />
                  {errors.cpf && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.cpf}</p>}
                </div>
                <div className="md:col-span-3 space-y-1 group relative">
                  <Label htmlFor="email" className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", (errors.email || isFieldInvalid("email", email)) ? "text-destructive" : "text-muted-foreground/80")}>E-mail</Label>
                  <ValidationTooltip field="email" value={email} />
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      className={cn(
                        "h-9 border-muted-foreground/20 focus:border-primary transition-all text-[11px]", 
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                    />
                    {email.includes("@") && getEmailSuggestion(email) && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-muted-foreground/40 pointer-events-none uppercase">
                        @{getEmailSuggestion(email)}
                      </span>
                    )}
                  </div>
                  {errors.email && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2 space-y-1 group relative">
                  <Label htmlFor="telefone" className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", (errors.telefone || isFieldInvalid("telefone", telefone)) ? "text-destructive" : "text-muted-foreground/80")}>Celular</Label>
                  <ValidationTooltip field="telefone" value={telefone} />
                  <Input
                    id="telefone"
                    placeholder="(11) 98765-4321"
                    className={cn(
                      "h-9 border-muted-foreground/20 focus:border-primary transition-all text-[11px] px-2 tracking-tighter", 
                      (errors.telefone || isFieldInvalid("telefone", telefone)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                    value={telefone}
                    onFocus={() => setFocusedField("telefone")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, telefone: true }));
                    }}
                    onChange={(e) => {
                      setTelefone(maskPhone(e.target.value));
                      if (errors.telefone) setErrors(prev => ({ ...prev, telefone: "" }));
                    }}
                  />
                  {errors.telefone && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.telefone}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-muted/20">
            <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">2. Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-4">
                <div className="md:col-span-2 space-y-1 group relative">
                  <Label htmlFor="cep" className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", (errors.cep || isFieldInvalid("cep", cep)) ? "text-destructive" : "text-muted-foreground/80")}>CEP</Label>
                  <ValidationTooltip field="cep" value={cep} />
                  <div className="relative">
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      className={cn(
                        "h-9 border-muted-foreground/20 focus:border-primary transition-all text-[11px] pr-8", 
                        (errors.cep || isFieldInvalid("cep", cep)) && "border-destructive focus:border-destructive"
                      )}
                      value={cep}
                      onFocus={() => setFocusedField("cep")}
                      onBlur={() => {
                        setFocusedField(null);
                        setTouched(prev => ({ ...prev, cep: true }));
                      }}
                      onChange={(e) => {
                        const val = maskCEP(e.target.value);
                        setCep(val);
                        if (errors.cep) setErrors(prev => ({ ...prev, cep: "" }));
                      }}
                      maxLength={9}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      {loadingFreight ? <Loader2 className="h-3 w-3 animate-spin text-primary" /> : <MapPin className={cn("h-3 w-3", (errors.cep || isFieldInvalid("cep", cep)) ? "text-destructive" : "text-muted-foreground/40")} />}
                    </div>
                  </div>
                  {errors.cep && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.cep}</p>}
                </div>
                <div className="md:col-span-10 space-y-1 group">
                  <Label htmlFor="endereco" className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", errors.endereco ? "text-destructive" : "text-muted-foreground/80")}>Logradouro (Rua/Avenida)</Label>
                  <Input
                    id="endereco"
                    placeholder="Digite o CEP acima"
                    readOnly
                    className={cn(
                      "h-9 bg-muted/20 border-muted-foreground/20 text-[11px] cursor-not-allowed", 
                      errors.endereco && !endereco && "border-destructive"
                    )}
                    value={endereco}
                  />
                </div>

                <div className="md:col-span-2 space-y-1 group relative">
                  <Label htmlFor="numero" className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", (errors.numero || isFieldInvalid("numero", numero)) ? "text-destructive" : "text-muted-foreground/80")}>Número</Label>
                  <ValidationTooltip field="numero" value={numero} />
                  <Input
                    id="numero"
                    placeholder="123"
                    className={cn(
                      "h-9 border-muted-foreground/20 focus:border-primary transition-all text-[11px]", 
                      (errors.numero || isFieldInvalid("numero", numero)) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                    value={numero}
                    onFocus={() => setFocusedField("numero")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, numero: true }));
                    }}
                    onChange={(e) => {
                      setNumero(e.target.value);
                      if (errors.numero) setErrors(prev => ({ ...prev, numero: "" }));
                    }}
                  />
                  {errors.numero && <p className="text-[10px] font-bold text-destructive uppercase px-1">{errors.numero}</p>}
                </div>
                <div className="md:col-span-4 space-y-1 group">
                  <Label htmlFor="bairro" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Bairro</Label>
                  <Input id="bairro" readOnly value={bairro} className="h-9 bg-muted/20 border-muted-foreground/20 text-[11px] cursor-not-allowed" />
                </div>
                <div className="md:col-span-4 space-y-1 group">
                  <Label htmlFor="cidade" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Cidade</Label>
                  <Input id="cidade" readOnly value={cidade} className="h-9 bg-muted/20 border-muted-foreground/20 text-[11px] cursor-not-allowed" />
                </div>
                <div className="md:col-span-2 space-y-1 group">
                  <Label htmlFor="estado" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Estado (UF)</Label>
                  <Input id="estado" readOnly value={estado} className="h-9 bg-muted/20 border-muted-foreground/20 text-[11px] uppercase cursor-not-allowed" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="min-h-[420px]">
            <Card className="shadow-lg border-muted/20 overflow-hidden h-fit">
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

              {/* Seleção de Cartões Salvos */}
              {paymentMethod === 'card' && (
                <div className="pt-6 border-t border-muted/30 animate-in fade-in slide-in-from-top-4 duration-500 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Selecione um cartão salvo</h4>
                    <Link to="/customer" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1">
                      <Plus className="h-3 w-3" /> Gerenciar
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cards.map((card) => (
                      <div 
                        key={card.id}
                        onClick={() => {
                          setSelectedCardId(card.id);
                          setIsPaymentOptionOpen(true);
                        }}
                        className={cn(
                          "relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group",
                          selectedCardId === card.id 
                            ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                            : "border-muted hover:border-primary/30 bg-background"
                        )}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <CreditCard className={cn("h-5 w-5", selectedCardId === card.id ? "text-primary" : "text-muted-foreground")} />
                          {selectedCardId === card.id && (
                            <CheckCircle2 className="h-4 w-4 text-primary animate-in zoom-in" />
                          )}
                        </div>
                        <div>
                          <p className={cn("text-xs font-black tracking-widest", selectedCardId === card.id ? "text-foreground" : "text-muted-foreground")}>{card.number}</p>
                          <div className="flex justify-between items-end mt-2">
                            <span className="text-[9px] font-bold uppercase text-muted-foreground/60">{card.name}</span>
                            <span className="text-[9px] font-bold tabular-nums text-muted-foreground/60">{card.expiry}</span>
                          </div>
                        </div>
                        
                        {/* Indicador de "Padrão" sutil */}
                        {card.isDefault && (
                          <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[7px] font-black px-2 py-0.5 rounded-bl-lg uppercase">Padrão</div>
                        )}
                      </div>
                    ))}
                    
                    {cards.length === 0 && (
                      <Link 
                        to="/customer" 
                        className="col-span-full border-2 border-dashed border-muted p-8 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground group"
                      >
                        <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Adicionar primeiro cartão</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-card p-5 rounded-2xl border-2 border-muted/50 shadow-2xl space-y-3 sticky top-24 transform transition-transform hover:shadow-primary/5">
            <h3 className="text-sm md:text-base font-black tracking-tighter uppercase border-b pb-2">Resumo Final</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="w-10 h-10 rounded-md bg-muted flex-shrink-0 overflow-hidden border border-muted-foreground/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[11px] line-clamp-1 leading-none mb-0.5">{item.name}</p>
                    <div className="flex gap-1.5">
                      <span className="text-[8px] font-black uppercase bg-secondary/10 text-secondary px-1.5 py-0.5 rounded">T {item.selectedSize}</span>
                      <span className="text-[8px] font-black uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded">{item.selectedColor}</span>
                      <span className="text-[8px] font-bold text-muted-foreground uppercase">{item.quantity} un</span>
                    </div>
                  </div>
                  <span className="font-black text-xs tabular-nums whitespace-nowrap">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-3 border-t text-[11px] font-medium text-muted-foreground">
              {/* 1. Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-foreground">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalItems)}</span>
              </div>

              {/* 2. Frete */}
              <div className="flex justify-between">
                <span>Taxa de Entrega</span>
                <span className="tabular-nums text-foreground">
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

              {/* Detalhes do Pagamento Selecionado */}
              <div className="pt-2 mt-1 border-t border-muted/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Pagamento</span>
                  <span className="text-[9px] font-black uppercase text-primary">{paymentMethod === 'pix' ? 'PIX' : 'Cartão'}</span>
                </div>
                
                {paymentMethod === 'card' && selectedCardId && (
                  <div className="flex justify-between items-center bg-muted/10 p-1.5 rounded-lg border border-muted/20">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="h-2.5 w-2.5 text-muted-foreground" />
                      <span className="text-[8px] font-bold text-muted-foreground tracking-tighter">
                        {cards.find(c => c.id === selectedCardId)?.number}
                      </span>
                    </div>
                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                      {cardPaymentType === 'credit' ? `${installments}x` : 'Débito'}
                    </span>
                  </div>
                )}
                
                {paymentMethod === 'pix' && (
                  <div className="flex items-center gap-1.5 bg-success/5 p-1.5 rounded-lg border border-success/10">
                    <div className="h-1 w-1 bg-success rounded-full animate-pulse" />
                    <span className="text-[8px] font-bold text-success uppercase tracking-widest">Aprovação instantânea</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-primary/10 flex flex-col items-end gap-1.5">
              <span className="text-[9px] font-black uppercase text-muted-foreground/70 tracking-[0.2em] leading-none">
                {cardPaymentType === 'credit' && installments > 1 ? `${installments}x de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grandTotal / installments)}` : 'Total a pagar agora'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-primary/80 tabular-nums tracking-tighter leading-none">R$</span>
                <span className="text-3xl font-black text-primary tabular-nums tracking-tighter leading-none">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grandTotal).replace('R$', '').trim()}
                </span>
              </div>
            </div>

            <Button 
              className="w-full bg-success hover:bg-green-600 h-10 shadow-lg rounded-full uppercase font-black tracking-widest mt-1 text-[11px] active:scale-95 transition-all group overflow-hidden relative" 
              onClick={handleConfirm}
            >
              <span className="relative z-10 flex items-center"><CheckCircle className="mr-2 h-3.5 w-3.5" /> Finalizar Pedido</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
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
