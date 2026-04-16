import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, User, Settings, CreditCard, ShoppingBag, MapPin, Heart, ChevronRight, CheckCircle2, Trash2, Plus, Bell, Lock } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useEffect, useRef } from "react"
import { getAddressByCep } from "@/lib/freight"

type Section = 'overview' | 'orders' | 'cards' | 'settings'

export default function CustomerArea() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<Section>('overview')
  const { cards, addCard, removeCard, updateCard, personalInfo, updatePersonalInfo } = useAuthStore()

  const [profileName, setProfileName] = useState(personalInfo?.name || '')
  const [profileEmail, setProfileEmail] = useState(personalInfo?.email || '')
  const [profilePhone, setProfilePhone] = useState(personalInfo?.phone || '')
  const [profileBirth, setProfileBirth] = useState(personalInfo?.birth || '')
  const [profileCpf, setProfileCpf] = useState(personalInfo?.cpf || '')
  const [profileCep, setProfileCep] = useState(personalInfo?.cep || '')
  const [profileEndereco, setProfileEndereco] = useState(personalInfo?.endereco || '')
  const [profileNumero, setProfileNumero] = useState(personalInfo?.numero || '')
  const [profileBairro, setProfileBairro] = useState(personalInfo?.bairro || '')
  const [profileCidade, setProfileCidade] = useState(personalInfo?.cidade || '')
  const [profileEstado, setProfileEstado] = useState(personalInfo?.estado || '')
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({})

  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Validation Logic (copied from Checkout)
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
        if (cleanCpf.length === 11) return isValidCPF(cleanCpf) ? "CPF válido e verificado" : "CPF inválido";
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
        timeoutRef.current = setTimeout(() => setVisible(false), 3000);
      } else {
        setVisible(false);
      }
      return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [value, focusedField, feedback, field]);

    if (!visible || !feedback) return null;
    const isValid = feedback.includes("válido") || feedback.includes("ok") || feedback.includes("validado") || feedback.includes("pronto") || feedback.includes("preenchido");

    return (
      <div className="absolute -top-7 left-2 z-50 animate-in fade-in slide-in-from-bottom-1 duration-200">
        <div className={cn(
          "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border whitespace-nowrap",
          isValid ? "bg-gray-100 text-gray-500 border-gray-200" : "bg-gray-100 text-gray-600 border-gray-200"
        )}>
          {feedback}
        </div>
        <div className="absolute -bottom-1 left-3 w-2 h-2 bg-gray-100 border-r border-b border-gray-200 transform rotate-45"></div>
      </div>
    );
  };

  // Auto-complete address when CEP is typed
  useEffect(() => {
    const cleanCep = profileCep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      const fetchAddress = async () => {
        try {
          const data = await getAddressByCep(cleanCep);
          if (data && !data.error) {
            setProfileEndereco(data.logradouro || "");
            setProfileBairro(data.bairro || "");
            setProfileCidade(data.localidade || "");
            setProfileEstado(data.uf || "");
            toast.success("Endereço preenchido automaticamente!");
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        }
      };
      fetchAddress();
    }
  }, [profileCep]);

  const handleSaveProfile = () => {
    updatePersonalInfo({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      birth: profileBirth,
      cpf: profileCpf,
      cep: profileCep,
      endereco: profileEndereco,
      numero: profileNumero,
      bairro: profileBairro,
      cidade: profileCidade,
      estado: profileEstado
    })
    toast.success('Perfil atualizado com sucesso!', {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
    })
  }

  const [isAddCardOpen, setIsAddCardOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState<string | null>(null)
  const [cardToEdit, setCardToEdit] = useState<any | null>(null)

  // Card form states
  const [newCardNumber, setNewCardNumber] = useState('')
  const [newCardName, setNewCardName] = useState('')
  const [newCardExpiry, setNewCardExpiry] = useState('')
  const [newCardCVV, setNewCardCVV] = useState('')
  const [newCardIsDefault, setNewCardIsDefault] = useState(false)

  const resetForm = () => {
    setNewCardNumber('')
    setNewCardName('')
    setNewCardExpiry('')
    setNewCardCVV('')
    setNewCardIsDefault(false)
    setCardToEdit(null)
  }

  const handleOpenEdit = (card: any) => {
    setCardToEdit(card)
    setNewCardNumber(card.number)
    setNewCardName(card.name)
    setNewCardExpiry(card.expiry)
    setNewCardCVV('***')
    setNewCardIsDefault(card.isDefault)
    setIsAddCardOpen(true)
  }

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault()

    if (cardToEdit) {
      updateCard({
        ...cardToEdit,
        number: newCardNumber,
        name: newCardName,
        expiry: newCardExpiry,
        isDefault: newCardIsDefault
      })
    } else {
      const last4 = newCardNumber.replace(/\s/g, '').slice(-4)
      const newCard = {
        id: Math.random().toString(36).substr(2, 9),
        number: `•••• •••• •••• ${last4}`,
        name: newCardName,
        expiry: newCardExpiry,
        isDefault: newCardIsDefault || cards.length === 0
      }
      addCard(newCard)
    }

    setIsAddCardOpen(false)
    resetForm()
  }

  const handleDeleteCard = () => {
    if (cardToDelete) {
      removeCard(cardToDelete)
      setCardToDelete(null)
    }
  }

  const sections = [
    { id: 'overview' as Section, label: 'Visão Geral', icon: User },
    { id: 'orders' as Section, label: 'Meus Pedidos', icon: Package },
    { id: 'cards' as Section, label: 'Pagamentos', icon: CreditCard },
    { id: 'settings' as Section, label: 'Configurar', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 mb-8 md:mb-12">
              <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500 aspect-square md:aspect-auto flex flex-col items-center justify-center md:items-start md:justify-between h-full relative">
                <CardContent className="p-1 md:p-6 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full w-full">
                  <div className="hidden md:block absolute -right-4 -top-4 opacity-5">
                    <ShoppingBag className="h-48 w-48" />
                  </div>
                  <div className="h-7 w-7 md:hidden rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1 md:mb-4">Pontos Siga</p>
                  <div>
                    <h4 className="text-sm md:text-3xl font-black tabular-nums tracking-tighter">1.250</h4>
                    <p className="hidden md:block text-[10px] font-bold text-success mt-1">Válidos até dez/2026</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-none shadow-xl bg-background rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500 aspect-square md:aspect-auto flex flex-col items-center justify-center md:items-start md:justify-between h-full relative cursor-pointer"
                onClick={() => setActiveSection('orders')}
              >
                <CardContent className="p-1 md:p-6 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full w-full">
                  <div className="hidden md:block absolute -right-4 -top-4 opacity-5">
                    <Package className="h-48 w-48" />
                  </div>
                  <div className="h-7 w-7 md:hidden rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
                    <Package className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1 md:mb-4">Pedidos Ativos</p>
                  <div>
                    <h4 className="text-sm md:text-3xl font-black tabular-nums tracking-tighter">2</h4>
                    <p className="hidden md:block text-[10px] font-bold text-primary mt-1">1 em rota de entrega</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-none shadow-xl bg-zinc-950 text-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500 aspect-square md:aspect-auto flex flex-col items-center justify-center md:items-start md:justify-between h-full relative group cursor-pointer"
                onClick={() => navigate('/favorites')}
              >
                <CardContent className="p-1 md:p-6 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full w-full">
                  <div className="hidden md:block absolute -right-4 -top-4 opacity-5 group-hover:opacity-70 group-hover:text-red-500 group-hover:scale-110 transition-all duration-700">
                    <Heart className="h-32 w-32 md:h-48 md:w-48" />
                  </div>
                  <div className="h-7 w-7 md:hidden rounded-full bg-primary/20 flex items-center justify-center mb-1 text-primary">
                    <Heart className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500 md:text-zinc-500/60 leading-none mb-1 md:mb-4 z-10">Wishlist</p>
                  <div className="z-10">
                    <h4 className="text-sm md:text-3xl font-black tabular-nums tracking-tighter text-white">
                      {typeof window !== 'undefined' ? Object.keys(localStorage).filter(key => key.startsWith('fav_') && localStorage.getItem(key) === 'true').length : 0}
                    </h4>
                    <p className="hidden md:flex text-[10px] font-bold text-zinc-400 mt-1 items-center gap-2 group-hover:text-white transition-colors">
                      Ver favoritos <ChevronRight className="h-3 w-3" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Latest Orders Section */}
            <div className="mt-4">
              <h2 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4 px-2">Pedidos Recentes</h2>
              <div className="space-y-6">
                {/* Order 1 - Em Trânsito */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    {/* Standard Icon Area for Desktop */}
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-zinc-950 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Em Trânsito
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4492
                        </span>
                      </div>
                      <div className="py-4 flex justify-center items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                          <Package className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                        </div>
                      </div>
                      <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Previsão: 10 Abr
                      </p>
                    </div>

                    {/* Order Details */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Tênis Urban Style Blue</h3>

                      <div className="space-y-4">
                        {/* Tracking Line */}
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-4 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(34,197,94,0.4)] z-10 border-3 border-background"></div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground text-sm uppercase">Em trânsito para sua cidade</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">03 abr 2026, 09:15</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-primary mt-1">
                                  <MapPin className="h-3 w-3" /> Centro de Distribuição - SP
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                              <div>
                                <p className="font-semibold text-muted-foreground text-sm uppercase">Saiu para entrega</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Previsto</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order 2 - Confirmado */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    {/* Order Image/Graphic */}
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-success text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                          Confirmado
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4491
                        </span>
                      </div>
                      <div className="py-2 flex justify-center items-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-background rounded-full shadow-lg flex items-center justify-center relative ring-4 ring-background/50">
                          <Package className="h-6 w-6 md:h-10 md:w-10 text-success" />
                        </div>
                      </div>
                      <p className="text-center text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                        Processando
                      </p>
                    </div>

                    {/* Order Details */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-lg font-black tracking-tighter uppercase mb-2">Moletom Premium Preto</h3>

                      <div className="space-y-4 mt-2">
                        {/* Tracking Line */}
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-4 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10 border-3 border-background animate-pulse"></div>
                              <div>
                                <p className="font-semibold text-foreground text-sm">Pedido Confirmado</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">05 abr 2026, 16:45</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                              <div>
                                <p className="font-semibold text-muted-foreground text-sm">Preparando para envio</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Em breve</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order 3 - Entregue */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    {/* Standard Icon Area for Desktop */}
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-success text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Entregue
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4490
                        </span>
                      </div>
                      <div className="py-4 flex justify-center items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                          <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-success" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest mb-1">Entrega</p>
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">02 abr 2026</p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Camiseta Básica Branca</h3>

                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-6 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success/20 z-10 border-3 border-background"></div>
                              <div className="flex-1">
                                <p className="font-semibold text-muted-foreground text-sm uppercase">Confirmado</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">30 mar 2026, 11:20</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success z-10 border-3 border-background shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                              <div>
                                <p className="font-semibold text-foreground text-sm uppercase">Entregue</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">02 abr 2026, 14:15</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-xl md:text-3xl font-black tracking-tighter uppercase mb-2">Meus Pedidos</h2>
              <p className="text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest">Acompanhe todos os seus pedidos</p>
            </div>

            <div className="space-y-6">
              {/* Reuse the standardized cards here */}
              {/* Order 1 - Em Trânsito */}
              <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                <div className="flex flex-col lg:flex-row">
                  <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                    <div className="flex justify-between items-start">
                      <span className="bg-zinc-950 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Em Trânsito
                      </span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        #ORD-4492
                      </span>
                    </div>
                    <div className="py-4 flex justify-center items-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                        <Package className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                      </div>
                    </div>
                    <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Previsão: 10 Abr
                    </p>
                  </div>

                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Tênis Urban Style Blue</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                        <div className="space-y-4 relative">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(34,197,94,0.4)] z-10 border-3 border-background"></div>
                            <div className="flex-1">
                              <p className="font-semibold text-foreground text-sm uppercase">Em trânsito para sua cidade</p>
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">03 abr 2026, 09:15</p>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-primary mt-1">
                                <MapPin className="h-3 w-3" /> Centro de Distribuição - SP
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                            <div>
                              <p className="font-semibold text-muted-foreground text-sm uppercase">Saiu para entrega</p>
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Previsto</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Order 2 - Confirmado */}
              <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                <div className="flex flex-col lg:flex-row">
                  <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                    <div className="flex justify-between items-start">
                      <span className="bg-success text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                        Confirmado
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        #ORD-4491
                      </span>
                    </div>
                    <div className="py-2 flex justify-center items-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-background rounded-full shadow-lg flex items-center justify-center relative ring-4 ring-background/50">
                        <Package className="h-6 w-6 md:h-10 md:w-10 text-success" />
                      </div>
                    </div>
                    <p className="text-center text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      Processando
                    </p>
                  </div>

                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-base md:text-lg font-black tracking-tighter uppercase mb-2">Moletom Premium Preto</h3>
                    <div className="space-y-4 mt-2">
                      <div className="relative">
                        <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                        <div className="space-y-4 relative">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10 border-3 border-background animate-pulse"></div>
                            <div>
                              <p className="font-semibold text-foreground text-sm">Pedido Confirmado</p>
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">05 abr 2026, 16:45</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                            <div>
                              <p className="font-semibold text-muted-foreground text-sm">Preparando para envio</p>
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Em breve</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Order 3 - Entregue */}
              <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                <div className="flex flex-col lg:flex-row">
                  <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                    <div className="flex justify-between items-start">
                      <span className="bg-success text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Entregue
                      </span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        #ORD-4490
                      </span>
                    </div>
                    <div className="py-4 flex justify-center items-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                        <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-success" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest mb-1">Entrega</p>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">02 abr 2026</p>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Camiseta Básica Branca</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                        <div className="space-y-6 relative">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-5 w-5 rounded-full bg-success/20 z-10 border-3 border-background"></div>
                            <div className="flex-1">
                              <p className="font-semibold text-muted-foreground text-sm uppercase">Confirmado</p>
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">30 mar 2026, 11:20</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-5 w-5 rounded-full bg-success z-10 border-3 border-background shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                            <div>
                              <p className="font-semibold text-foreground text-sm uppercase">Entregue</p>
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">02 abr 2026, 14:15</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )

      case 'cards':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl md:text-3xl font-black tracking-tighter uppercase mb-1">Formas de Pagamento</h2>
                <p className="text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest">Gerencie seus cartões de crédito</p>
              </div>
              <Button
                onClick={() => setIsAddCardOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-orange-600 h-10 px-4 text-[10px] font-black uppercase tracking-widest rounded-lg transition-transform active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar Cartão
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  className={cn(
                    "border-none shadow-xl rounded-xl overflow-hidden transition-all group relative h-[180px]",
                    card.isDefault
                      ? "bg-gradient-to-br from-primary to-orange-600 scale-[1.02] z-10"
                      : "bg-gradient-to-br from-zinc-800 to-zinc-950 hover:scale-[1.02]"
                  )}
                >
                  <CardContent className="p-6 text-white h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <CreditCard className="h-6 w-6 text-white/80" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/60 mb-1">Número do Cartão</p>
                        <p className="text-lg font-black tracking-widest tabular-nums">{card.number}</p>
                      </div>

                      <div className="flex justify-between items-end gap-4">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">Nome</p>
                            <p className="text-[11px] font-black uppercase tracking-tight truncate">{card.name}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">Validade</p>
                            <p className="text-[11px] font-black tabular-nums tracking-tight">{card.expiry}</p>
                          </div>
                        </div>

                        {card.isDefault && (
                          <div className="flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/20 shadow-lg animate-in fade-in zoom-in-95">
                            <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                            <span className="text-[9px] font-black uppercase tracking-widest leading-none">Padrão</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleOpenEdit(card)}
                        className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        title="Editar Cartão"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCardToDelete(card.id)}
                        className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
                        title="Remover Cartão"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {cards.length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-2xl text-muted-foreground">
                  <CreditCard className="h-10 w-10 mb-4 opacity-20" />
                  <p className="text-xs font-black uppercase tracking-widest">Nenhum cartão cadastrado</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase mb-1">Configurações</h2>
              <p className="text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest">Gerencie suas preferências e segurança</p>
            </div>

            {/* Informações Pessoais */}
            <Card className="border-none shadow-xl bg-background rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-foreground">
                  <User className="h-5 w-5 text-muted-foreground" />
                  Informações Pessoais
                </h3>
                <div className="space-y-6">
                  {/* Seção 1: Identificação */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold">1</span>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Dados de Identificação</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-4">
                    <div className="md:col-span-5 space-y-1 relative">
                      <Label htmlFor="name" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Nome Completo</Label>
                      <Input id="name" value={profileName} onFocus={() => setFocusedField('nome')} onBlur={() => setFocusedField(null)} onChange={e => { setProfileName(e.target.value.replace(/[0-9]/g, '')); if (profileErrors.nome) setProfileErrors((prev: Record<string, string>) => ({ ...prev, nome: "" })); }} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px]" />
                      <ValidationTooltip field="nome" value={profileName} />
                    </div>
                    <div className="md:col-span-2 space-y-1 relative">
                      <Label htmlFor="cpf" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" value={profileCpf} onFocus={() => setFocusedField('cpf')} onBlur={() => setFocusedField(null)} onChange={e => { setProfileCpf(e.target.value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1')); if (profileErrors.cpf) setProfileErrors((prev: Record<string, string>) => ({ ...prev, cpf: "" })); }} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px] px-2 tracking-tighter" />
                      <ValidationTooltip field="cpf" value={profileCpf} />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <Label htmlFor="birth" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Nascimento</Label>
                      <Input id="birth" type="date" value={profileBirth} onChange={e => setProfileBirth(e.target.value)} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px] px-1" />
                    </div>
                    <div className="md:col-span-3 space-y-1 relative">
                      <Label htmlFor="email" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">E-mail</Label>
                      <Input id="email" type="email" value={profileEmail} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} onChange={e => { setProfileEmail(e.target.value); if (profileErrors.email) setProfileErrors((prev: Record<string, string>) => ({ ...prev, email: "" })); }} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px]" />
                      <ValidationTooltip field="email" value={profileEmail} />
                    </div>
                    </div>
                  </div>

                  {/* Seção 2: Endereço */}
                  <div className="space-y-4 pt-2 border-t border-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold">2</span>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Endereço de Entrega</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-4">
                    <div className="md:col-span-2 space-y-1 relative">
                      <Label htmlFor="phone" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Celular</Label>
                      <Input id="phone" value={profilePhone} onFocus={() => setFocusedField('telefone')} onBlur={() => setFocusedField(null)} onChange={e => { setProfilePhone(e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{4})\d+?$/, "$1")); if (profileErrors.telefone) setProfileErrors((prev: Record<string, string>) => ({ ...prev, telefone: "" })); }} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px] px-2 tracking-tighter" />
                      <ValidationTooltip field="telefone" value={profilePhone} />
                    </div>
                    <div className="md:col-span-2 space-y-1 relative">
                      <Label htmlFor="cep" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">CEP</Label>
                      <Input id="cep" placeholder="00000-000" value={profileCep} onFocus={() => setFocusedField('cep')} onBlur={() => setFocusedField(null)} onChange={e => { setProfileCep(e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1')); if (profileErrors.cep) setProfileErrors((prev: Record<string, string>) => ({ ...prev, cep: "" })); }} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px] px-2" />
                      <ValidationTooltip field="cep" value={profileCep} />
                    </div>
                    <div className="md:col-span-8 space-y-1">
                      <Label htmlFor="endereco" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Logradouro</Label>
                      <Input id="endereco" value={profileEndereco} onChange={e => setProfileEndereco(e.target.value)} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px]" />
                    </div>

                      <div className="md:col-span-1 space-y-1 relative">
                        <Label htmlFor="numero" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Nº</Label>
                        <Input id="numero" placeholder="123" value={profileNumero} onFocus={() => setFocusedField('numero')} onBlur={() => setFocusedField(null)} onChange={e => { setProfileNumero(e.target.value); if (profileErrors.numero) setProfileErrors((prev: Record<string, string>) => ({ ...prev, numero: "" })); }} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px] placeholder:text-[10px]" />
                        <ValidationTooltip field="numero" value={profileNumero} />
                      </div>
                      <div className="md:col-span-3 space-y-1">
                        <Label htmlFor="bairro" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Bairro</Label>
                        <Input id="bairro" value={profileBairro} onChange={e => setProfileBairro(e.target.value)} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px]" />
                      </div>
                      <div className="md:col-span-6 space-y-1">
                        <Label htmlFor="cidade" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Cidade</Label>
                        <Input id="cidade" value={profileCidade} onChange={e => setProfileCidade(e.target.value)} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px]" />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <Label htmlFor="estado" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">UF</Label>
                        <Input id="estado" value={profileEstado} onChange={e => setProfileEstado(e.target.value)} className="h-9 md:h-9 border-muted-foreground/20 focus:border-primary text-[11px] uppercase" maxLength={2} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button onClick={handleSaveProfile} className="bg-primary hover:bg-orange-600 h-9 px-8 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Salvar Configurações</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="border-none shadow-xl bg-background rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-foreground">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  Segurança
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="w-full h-9 md:h-12 text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-2 border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full h-9 md:h-12 text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-2 border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Segurança 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notificações */}
            <Card className="border-none shadow-xl bg-background rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-foreground">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  Preferências de Notificações
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-tight">Notificações por E-mail</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 cursor-pointer accent-primary" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-tight">Notificações de Pedidos</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 cursor-pointer accent-primary" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-tight">Ofertas Exclusivas</span>
                    <input type="checkbox" className="h-4 w-4 cursor-pointer accent-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20 overflow-x-hidden">
      {/* Hero Section - Super Compact on mobile */}
      <div className="bg-gradient-to-b from-orange-50/80 via-white to-white text-foreground pt-6 pb-6 md:pt-10 md:pb-20 relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 shadow-lg">
            <div className="h-full w-full rounded-full bg-background border-[3px] border-white flex items-center justify-center">
              <span className="text-lg md:text-2xl font-bold tracking-widest text-foreground">JO</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-bold tracking-tighter uppercase text-foreground">João Oliveira</h1>
            <p className="text-muted-foreground font-semibold tracking-widest uppercase text-[9px] md:text-[10px] mt-1 md:mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"></span>
              Siga VIP Member
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Navigation Pills - Only visible on small screens */}
      <div className="lg:hidden sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-border/50 py-2 mb-4 no-scrollbar overflow-x-auto touch-pan-x">
        <div className="flex items-center gap-3 px-4 min-w-max">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all active:scale-90",
                  isActive
                    ? "bg-zinc-950 text-white shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "")} />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:-mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* DESKTOP SIDEBAR - Hidden on smaller screens */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <nav className="flex flex-col space-y-3 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl sticky top-24">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4 px-2">Sua Conta</h3>

              {sections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center justify-between w-full p-4 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-all group ${isActive
                      ? 'bg-neutral-950 text-white shadow-lg'
                      : 'hover:bg-muted text-foreground font-semibold'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'opacity-50 group-hover:opacity-100'}`} />
                      <span className="uppercase tracking-widest text-[11px] md:text-xs font-semibold">{section.label}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${isActive
                      ? 'opacity-50 group-hover:translate-x-1 group-hover:opacity-100'
                      : 'opacity-0 group-hover:translate-x-1 group-hover:opacity-100'
                      } transition-all`} />
                  </button>
                )
              })}

            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="w-full flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
      {/* MODALS */}

      {/* ⚠️ Add Card Modal */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background border border-border/40 rounded-2xl shadow-2xl p-6 w-[95%] max-w-[450px] relative animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                {cardToEdit ? <Settings className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </div>
              <h2 className="text-xl font-black tracking-tighter uppercase">{cardToEdit ? 'Editar Cartão' : 'Adicionar Novo Cartão'}</h2>
            </div>

            <form onSubmit={handleSaveCard} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Número do Cartão</Label>
                <Input
                  required
                  placeholder="0000 0000 0000 0000"
                  value={newCardNumber}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                    if (v.length <= 19) setNewCardNumber(v);
                  }}
                  className="h-11 border-muted-foreground/20 focus:border-primary rounded-xl text-[13px] font-medium tabular-nums tracking-wider"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Nome no Cartão</Label>
                <Input
                  required
                  placeholder="Nome impresso no cartão"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  className="h-11 border-muted-foreground/20 focus:border-primary rounded-xl text-[13px] font-medium tracking-tight"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Validade</Label>
                  <Input
                    required
                    placeholder="MM/AA"
                    value={newCardExpiry}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').trim();
                      if (v.length <= 5) setNewCardExpiry(v);
                    }}
                    className="h-11 border-muted-foreground/20 focus:border-primary rounded-xl text-[13px] font-medium tabular-nums tracking-wider"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">CVV</Label>
                  <Input
                    id="card-cvv"
                    required
                    type="password"
                    placeholder="***"
                    autoComplete="off"
                    value={newCardCVV}
                    onMouseDown={() => {
                      if (newCardCVV.includes('*')) setNewCardCVV('')
                    }}
                    onFocus={() => {
                      if (newCardCVV.includes('*')) setNewCardCVV('')
                    }}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      if (v.length <= 4) setNewCardCVV(v);
                    }}
                    className="h-11 border-muted-foreground/20 focus:border-primary rounded-xl text-[13px] font-medium tracking-widest"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border/30 cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => setNewCardIsDefault(!newCardIsDefault)}>
                <div className={cn(
                  "h-4 w-4 rounded border flex items-center justify-center transition-all",
                  newCardIsDefault ? "bg-primary border-primary" : "border-muted-foreground/30 bg-transparent"
                )}>
                  {newCardIsDefault && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Definir como cartão padrão</span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl"
                  onClick={() => { setIsAddCardOpen(false); resetForm(); }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl bg-primary hover:bg-orange-600"
                >
                  {cardToEdit ? 'Salvar Alterações' : 'Confirmar Cartão'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🗑️ Delete Confirm Modal */}
      {cardToDelete && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background border border-border/40 rounded-2xl shadow-2xl p-8 w-[95%] max-w-[380px] relative animate-in scale-in-95 duration-300">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-destructive/10 text-destructive mb-2">
                <Trash2 className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-black tracking-tighter uppercase px-2">Remover Método de Pagamento?</h2>
              <p className="text-muted-foreground text-xs font-medium leading-relaxed mb-4">
                Tem certeza que deseja excluir esse cartão? Esta ação não pode ser desfeita.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="destructive"
                className="w-full font-black uppercase tracking-widest text-[10px] h-12 rounded-xl bg-destructive hover:bg-red-700 transition-colors"
                onClick={handleDeleteCard}
              >
                Sim, Remover Cartão
              </Button>
              <Button
                variant="ghost"
                className="w-full font-black uppercase tracking-widest text-[10px] h-12 rounded-xl hover:bg-muted"
                onClick={() => setCardToDelete(null)}
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
