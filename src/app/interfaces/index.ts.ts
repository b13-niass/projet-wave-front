// API Format
export interface ApiResponse<T = any> {
  status: string;
  data: T;
  message: string;
}

// Login Response
export interface ILoginResponse {
  id: number;
  telephone: string;
  codeVerification: string;
}

export interface IAccueilResponse {
  user: IUser;
  wallet: IWallet;
  user_banque: IUserBanque[];
  qr_code: string;
}

export interface IContactResponse {
  contacts: IContact[];
}

export interface ITransfertResponse {
  transaction: ITransaction;
}

export interface IFraisResponse {
  frais: IFrais;
}

export interface IFournisseurResponse {
  fournisseurs: IFournisseur[];
}

export interface IUserResponse {
  user: IUser;
}

export interface IToken {
  token: string;
}

// From Models
export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
  AGENCE = 'agence',
  FOURNISSEUR = 'fournisseur',
}

export enum TypeTransaction {
  DEPOT = 'depot',
  RETRAIT = 'retrait',
  TRANSFERT = 'transfert',
  PAIEMENT = 'paiement',
  RECHARGE_CREDIT = 'recharge_credit',
}

export enum StatutTransaction {
  EFFECTUER = 'effectuer',
  ANNULER = 'annuler',
}

export enum EtatUserBanque {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TypeContrat {
  BANQUE = 'banque',
  FOURNISSEUR = 'fournisseur',
}

export enum TypeFournisseur {
  FACTURE = 'facture',
  RESTAURANT = 'restaurant',
}

export interface IUser {
  id: number;
  nom: string;
  prenom: string;
  password: string;
  adresse: string;
  telephone: string;
  file_cni: string;
  cni: string;
  date_naissance: Date;
  code_verification: string;
  role: Role;
  statut_compte: string;
  qrcode?: string;
  wallet?: IWallet;
  pays_id: number;
  pays: IPays;
  transactionsSent: ITransaction[];
  transactionsReceived: ITransaction[];
  notified: INotification[];
  notifier: INotification[];
  fournisseur?: IFournisseur;
  contratsBanque: IContratBanque[];
  userBanques: IUserBanque[];
  agence?: IAgence;
  contratsFournisseur: IContratFournisseur[];
  contact: IContact[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPays {
  id: number;
  nom: string;
  indicatif: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser[];
}

export interface IAgence {
  id: number;
  longitude: number;
  latitude: number;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
  user: IUser;
}

export interface ITransaction {
  id: number;
  sender_id?: number;
  montant_envoye: number;
  montant_recus: number;
  type_transaction: TypeTransaction;
  statut: StatutTransaction;
  frais_id?: number;
  receiver_id: number;
  createdAt: Date;
  updatedAt: Date;
  sender?: IUser;
  receiver: IUser;
  frais?: IFrais;
  paiement?: IPaiement;
  notification?: INotification;
}

export interface IContact {
  id: number;
  nom: string;
  telephone: string;
  user_id: number;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFrais {
  id: number;
  valeur: number;
  transactions: ITransaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWallet {
  id: number;
  user_id: number;
  plafond: number;
  solde: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface INotification {
  id: number;
  notifier_id: number;
  notified_id: number;
  titre: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  transaction_id: number;
  transaction: ITransaction;
  notifier: IUser;
  notified: IUser;
}

export interface IFournisseur {
  id: number;
  libelle: string;
  logo: string;
  user_id: number;
  user: IUser;
  contrats: IContratFournisseur[];
  subscribe: ISubscribeFournisseur[];
  type_fournisseur: TypeFournisseur;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContrat {
  id: number;
  libelle: string;
  description: string;
  pourcentage: number;
  type: TypeContrat;
  contratsFournisseur: IContratFournisseur[];
  contratsBanque: IContratBanque[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscribeFournisseur {
  id: number;
  reference: string;
  fournisseur_id: number;
  fournisseur: IFournisseur;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContratFournisseur {
  id: number;
  user_id: number;
  fournisseur_id: number;
  date_debut: Date;
  date_fin: Date;
  id_type_contrat: number;
  user: IUser;
  fournisseur: IFournisseur;
  contrat: IContrat;
}

export interface IContratBanque {
  id: number;
  user_id: number;
  banque_id: number;
  date_debut: Date;
  date_fin: Date;
  id_type_contrat: number;
  user: IUser;
  banque: IBanque;
  contrat: IContrat;
}

export interface IPaiement {
  id: number;
  transaction_id: number;
  transaction: ITransaction;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBanque {
  id: number;
  libelle: string;
  logo: string;
  userBanques: IUserBanque[];
  contratsBanque: IContratBanque[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserBanque {
  id: number;
  user_id: number;
  banque_id: number;
  code: string;
  etat: EtatUserBanque;
  user: IUser;
  banque: IBanque;
  createdAt: Date;
  updatedAt: Date;
}
