export interface Profile {
    id: string;
    name: string | null;
    company_name: string | null;
    role: 'client' | 'admin';
    status: 'pending' | 'approved' | 'rejected';
    logo_url?: string | null;
    whatsapp?: string | null;
    website?: string | null;
    address?: string | null;
    created_at: string;
}

export interface Property {
    id: string;
    user_id: string;
    name: string;
    type: 'chale' | 'hotel' | 'pousada' | 'outro';
    city: string | null;
    state: string | null;
    avg_daily_rate: number | null;
    fixed_cost_monthly: number | null;
    marketing_invest_monthly?: number | null;
    photo_url?: string | null;
    created_at: string;
}

export interface Booking {
    id: string;
    user_id: string;
    property_id: string;
    property?: Property; // Join
    guest_name: string | null;
    guest_contact: string | null;
    check_in: string;
    check_out: string;
    gross_value: number;
    channel: 'direct' | 'booking' | 'airbnb' | 'other';
    channel_fee_value: number;
    ad_cost: number;
    status: 'confirmed' | 'cancelled' | 'pending';
    notes: string | null;
    created_at: string;
}
