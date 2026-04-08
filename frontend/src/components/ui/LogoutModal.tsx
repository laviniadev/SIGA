import React, { useState, cloneElement } from "react"
import type { ReactElement } from "react"
import { createPortal } from "react-dom"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LogoutModalProps {
  onConfirm: () => void;
  children: ReactElement;
}

export function LogoutModal({ onConfirm, children }: LogoutModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const trigger = cloneElement(children as React.ReactElement<any>, {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);
    }
  });

  return (
    <>
      {trigger}
      {isOpen && createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background border border-border/40 rounded-xl shadow-2xl p-6 w-[90%] max-w-[360px] relative">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-10 w-10 flex items-center justify-center rounded-full bg-destructive/10 text-destructive">
                 <LogOut className="h-5 w-5" />
               </div>
               <h2 className="text-xl font-bold tracking-tight">Encerrar sessão</h2>
            </div>
            
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Tem certeza que deseja sair da sua conta? Você precisará realizar o acesso novamente.
            </p>
            
            <div className="flex gap-3">
              <Button 
                 variant="outline" 
                 className="flex-1 font-bold uppercase tracking-widest text-[10px] h-10" 
                 onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1 font-bold uppercase tracking-widest text-[10px] h-10" 
                onClick={() => {
                  setIsOpen(false);
                  onConfirm();
                }}
              >
                Sair da Conta
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
