export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      channel_type: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      channels: {
        Row: {
          channel_name: string
          channel_type_id: number
          conversation_type_id: number
          created_at: string | null
          embedding_model_id: number | null
          id: string
          langchain_pg_collection_id: string | null
          language_model_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          channel_name: string
          channel_type_id?: number
          conversation_type_id?: number
          created_at?: string | null
          embedding_model_id?: number | null
          id?: string
          langchain_pg_collection_id?: string | null
          language_model_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          channel_name?: string
          channel_type_id?: number
          conversation_type_id?: number
          created_at?: string | null
          embedding_model_id?: number | null
          id?: string
          langchain_pg_collection_id?: string | null
          language_model_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_channel_type_id_fkey"
            columns: ["channel_type_id"]
            referencedRelation: "channel_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_conversation_type_id_fkey"
            columns: ["conversation_type_id"]
            referencedRelation: "conversation_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_embedding_model_id_fkey"
            columns: ["embedding_model_id"]
            referencedRelation: "embedding_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_language_model_id_fkey"
            columns: ["language_model_id"]
            referencedRelation: "language_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      conversation_type: {
        Row: {
          id: number
          type: string | null
        }
        Insert: {
          id?: number
          type?: string | null
        }
        Update: {
          id?: number
          type?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          answer: string
          channel_id: string
          created_at: string | null
          id: string
          metadata: string | null
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          channel_id: string
          created_at?: string | null
          id?: string
          metadata?: string | null
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          channel_id?: string
          created_at?: string | null
          id?: string
          metadata?: string | null
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          channel_id: string | null
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          channel_id?: string | null
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          channel_id?: string | null
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
      embedding_models: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      langchain_pg_collection: {
        Row: {
          cmetadata: Json | null
          name: string | null
          uuid: string
        }
        Insert: {
          cmetadata?: Json | null
          name?: string | null
          uuid: string
        }
        Update: {
          cmetadata?: Json | null
          name?: string | null
          uuid?: string
        }
        Relationships: []
      }
      langchain_pg_embedding: {
        Row: {
          cmetadata: Json | null
          collection_id: string | null
          custom_id: string | null
          document: string | null
          embedding: string | null
          uuid: string
        }
        Insert: {
          cmetadata?: Json | null
          collection_id?: string | null
          custom_id?: string | null
          document?: string | null
          embedding?: string | null
          uuid: string
        }
        Update: {
          cmetadata?: Json | null
          collection_id?: string | null
          custom_id?: string | null
          document?: string | null
          embedding?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "langchain_pg_embedding_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "langchain_pg_collection"
            referencedColumns: ["uuid"]
          }
        ]
      }
      language_models: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_documents: {
        Row: {
          channel_id: string
          created_at: string
          document_location: string | null
          document_name: string
          id: string
        }
        Insert: {
          channel_id: string
          created_at?: string
          document_location?: string | null
          document_name: string
          id?: string
        }
        Update: {
          channel_id?: string
          created_at?: string
          document_location?: string | null
          document_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_documents_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
          channel_id?: string
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
