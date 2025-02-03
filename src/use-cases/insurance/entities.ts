
export interface Insurance {
  id: number
  title: string
}

export interface InsureCompany {
  id: number
  title: string
  satisfaction: number
  wealthLevel: number
  complaintResponseTime: number
  branchNumber: number
  enable: boolean
  marketerEnable: boolean
  available: boolean
  maxBranchDiscount: number
  branchDiscountPercent: number
  maxCompanyDiscount: number
  companyDiscountPercent: number
  maxBimitoDiscount: number
  bimitoDiscountPercent: number
  maxMarketerDiscount: number
  marketerDiscountPercent: number
  bimitoDiscountTitle: string
  azkiDiscountTitle: string
  hideDiscount: boolean
  description: string
  productDescription?: string
  giftTitle: string
  hasGift: boolean
  onlineDamage: boolean
  features: Feature[]
  dynamicBadges: unknown[]
  businessProperties: BusinessProperty[]
  installments: Installment[]
  icon: string
  helpIcons: HelpIcon[]
  oldVehicleAge: number
  oldVehiclePercent: number
  oldVehiclePenaltyPercent: number
  extraPercent: number
  extraPenaltyPercent: number
  damagedShortTermEnable: boolean
  maxDayOfPenalty: number
  forgivenessDescription?: string
  enableExpireDatePayment: boolean
  shortPenaltyForgiveness: boolean
  longPenaltyForgiveness: boolean
  cashPayment: boolean
  azkiPenaltyDiscountEnable: boolean
  maxAzkiPenaltyDiscount: number
  stick?: Stick
}

export interface Feature {
  icon: string
  title: string
  newRelease: boolean
  description: string
}

export interface BusinessProperty {
  icon?: string
  type: string
  color: string
  title: string
  enabled: boolean
  primary: boolean
  description: string
}

export interface Installment {
  enable: boolean
  enableForSellers: boolean
  underInstallmentLimitPrice: boolean
  installments: Installment2[]
  title: string
  label: string
  description: string
  credit: boolean
  type: number
  default: boolean
}

export interface Installment2 {
  percent: number
  month: number
}

export interface HelpIcon {
  title: string
  url: string
}

export interface Stick {
  stickDirection: string
  stickReason: string
}
