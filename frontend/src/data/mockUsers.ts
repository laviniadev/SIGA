export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  passwordHash: string; // Falso para teste (usemos apenas matching de plaintext por simplicidade neste mock)
}

export const mockUsers: User[] = [
  {
    id: "admin_1",
    name: "João Administrador",
    email: "admin@siga.com",
    role: "admin",
    passwordHash: "admin123" 
  },
  {
    id: "cust_1",
    name: "Maria Cliente",
    email: "cliente@siga.com",
    role: "customer",
    passwordHash: "cliente123"
  }
];
