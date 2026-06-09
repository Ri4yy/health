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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          apartment: string | null
          city: string
          created_at: string
          entrance: string | null
          floor: string | null
          house: string
          id: string
          intercom: string | null
          is_default: boolean | null
          street: string
          title: string
          user_id: string
        }
        Insert: {
          apartment?: string | null
          city: string
          created_at?: string
          entrance?: string | null
          floor?: string | null
          house: string
          id?: string
          intercom?: string | null
          is_default?: boolean | null
          street: string
          title: string
          user_id: string
        }
        Update: {
          apartment?: string | null
          city?: string
          created_at?: string
          entrance?: string | null
          floor?: string | null
          house?: string
          id?: string
          intercom?: string | null
          is_default?: boolean | null
          street?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bonus_history: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bonus_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          quantity: number
          user_id: string
          variant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          quantity?: number
          user_id: string
          variant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          quantity?: number
          user_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_products: {
        Row: {
          goal_id: string
          product_id: string
        }
        Insert: {
          goal_id: string
          product_id: string
        }
        Update: {
          goal_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_products_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goal_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          price_at_purchase: number
          quantity: number
          variant_id: string | null
        }
        Insert: {
          id?: string
          order_id: string
          price_at_purchase: number
          quantity: number
          variant_id?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          price_at_purchase?: number
          quantity?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          comment: string | null
          contact_name: string
          contact_phone: string
          created_at: string
          delivery_address: string
          delivery_date: string | null
          delivery_method: string | null
          delivery_time: string | null
          discount_amount: number | null
          id: string
          order_number: string
          payment_method: string | null
          promocode: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_price: number
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          contact_name: string
          contact_phone: string
          created_at?: string
          delivery_address: string
          delivery_date?: string | null
          delivery_method?: string | null
          delivery_time?: string | null
          discount_amount?: number | null
          id?: string
          order_number: string
          payment_method?: string | null
          promocode?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_price: number
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          contact_name?: string
          contact_phone?: string
          created_at?: string
          delivery_address?: string
          delivery_date?: string | null
          delivery_method?: string | null
          delivery_time?: string | null
          discount_amount?: number | null
          id?: string
          order_number?: string
          payment_method?: string | null
          promocode?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_promocode_fkey"
            columns: ["promocode"]
            isOneToOne: false
            referencedRelation: "promocodes"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          days_count: number | null
          id: string
          is_popular: boolean | null
          label: string
          meals_per_day: number | null
          old_price: number | null
          price: number
          product_id: string
        }
        Insert: {
          created_at?: string
          days_count?: number | null
          id?: string
          is_popular?: boolean | null
          label: string
          meals_per_day?: number | null
          old_price?: number | null
          price: number
          product_id: string
        }
        Update: {
          created_at?: string
          days_count?: number | null
          id?: string
          is_popular?: boolean | null
          label?: string
          meals_per_day?: number | null
          old_price?: number | null
          price?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          allergens: string[] | null
          badges: string[] | null
          calories: number | null
          carbs: number | null
          category_id: string | null
          created_at: string
          description: string | null
          diet_types: string[] | null
          fats: number | null
          id: string
          images: string[] | null
          in_stock: boolean | null
          ingredients: string | null
          name: string
          product_type: string | null
          protein: number | null
          rating: number | null
          review_count: number | null
          slug_id: number
        }
        Insert: {
          allergens?: string[] | null
          badges?: string[] | null
          calories?: number | null
          carbs?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          diet_types?: string[] | null
          fats?: number | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          ingredients?: string | null
          name: string
          product_type?: string | null
          protein?: number | null
          rating?: number | null
          review_count?: number | null
          slug_id?: never
        }
        Update: {
          allergens?: string[] | null
          badges?: string[] | null
          calories?: number | null
          carbs?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          diet_types?: string[] | null
          fats?: number | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          ingredients?: string | null
          name?: string
          product_type?: string | null
          protein?: number | null
          rating?: number | null
          review_count?: number | null
          slug_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bonus_balance: number | null
          created_at: string
          full_name: string
          id: string
          loyalty_level: string | null
          phone: string | null
          total_spent: number | null
        }
        Insert: {
          bonus_balance?: number | null
          created_at?: string
          full_name: string
          id: string
          loyalty_level?: string | null
          phone?: string | null
          total_spent?: number | null
        }
        Update: {
          bonus_balance?: number | null
          created_at?: string
          full_name?: string
          id?: string
          loyalty_level?: string | null
          phone?: string | null
          total_spent?: number | null
        }
        Relationships: []
      }
      promocodes: {
        Row: {
          code: string
          created_at: string
          is_active: boolean | null
          type: Database["public"]["Enums"]["discount_type"]
          value: number
        }
        Insert: {
          code: string
          created_at?: string
          is_active?: boolean | null
          type: Database["public"]["Enums"]["discount_type"]
          value: number
        }
        Update: {
          code?: string
          created_at?: string
          is_active?: boolean | null
          type?: Database["public"]["Enums"]["discount_type"]
          value?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          text: string | null
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          text?: string | null
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      discount_type: "percent" | "fixed"
      order_status:
        | "new"
        | "confirmed"
        | "preparing"
        | "shipping"
        | "delivered"
        | "cancelled"
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
      discount_type: ["percent", "fixed"],
      order_status: [
        "new",
        "confirmed",
        "preparing",
        "shipping",
        "delivered",
        "cancelled",
      ],
    },
  },
} as const
