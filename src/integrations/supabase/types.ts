export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      checkout_sessions: {
        Row: {
          birth_data: Json
          created_at: string
          email: string
          id: string
          paid_at: string | null
          session_id: string
          status: string
        }
        Insert: {
          birth_data: Json
          created_at?: string
          email: string
          id?: string
          paid_at?: string | null
          session_id: string
          status?: string
        }
        Update: {
          birth_data?: Json
          created_at?: string
          email?: string
          id?: string
          paid_at?: string | null
          session_id?: string
          status?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          access_token: string
          birth_data: Json
          created_at: string
          email: string
          id: string
          order_id: string
          paid_at: string | null
          status: string
        }
        Insert: {
          access_token: string
          birth_data: Json
          created_at?: string
          email: string
          id?: string
          order_id?: string
          paid_at?: string | null
          status?: string
        }
        Update: {
          access_token?: string
          birth_data?: Json
          created_at?: string
          email?: string
          id?: string
          order_id?: string
          paid_at?: string | null
          status?: string
        }
        Relationships: []
      }
      saved_charts: {
        Row: {
          birth_data: Json
          chart_data: Json
          created_at: string
          id: string
          name: string
          premium_purchase_id: string | null
          user_id: string
        }
        Insert: {
          birth_data: Json
          chart_data: Json
          created_at?: string
          id?: string
          name: string
          premium_purchase_id?: string | null
          user_id: string
        }
        Update: {
          birth_data?: Json
          chart_data?: Json
          created_at?: string
          id?: string
          name?: string
          premium_purchase_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          birth_data: Json | null
          charts_created_count: number
          created_at: string
          current_premium_id: string | null
          id: string
          is_premium: boolean
          mp_last_payment_id: string | null
          premium_activated_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          birth_data?: Json | null
          charts_created_count?: number
          created_at?: string
          current_premium_id?: string | null
          id?: string
          is_premium?: boolean
          mp_last_payment_id?: string | null
          premium_activated_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          birth_data?: Json | null
          charts_created_count?: number
          created_at?: string
          current_premium_id?: string | null
          id?: string
          is_premium?: boolean
          mp_last_payment_id?: string | null
          premium_activated_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_metrics: {
        Row: {
          conversions_month: number | null
          new_users_week: number | null
          premium_users: number | null
          total_charts: number | null
          total_users: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_toggle_premium: {
        Args: { p_is_premium: boolean; p_user_id: string }
        Returns: Json
      }
      get_admin_metrics: { Args: never; Returns: Json }
      get_admin_payments: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: Json
      }
      get_admin_users: {
        Args: {
          p_filter?: string
          p_limit?: number
          p_offset?: number
          p_search?: string
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
