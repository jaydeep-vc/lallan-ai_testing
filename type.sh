# For updating the type schema 
# Run this file only when the databse is changed
# Or when you don't have any supabase.ts / type file

# Load environment variables from .env.local
if [ -f .env.local ]; then
  source .env.local
fi

# Now you can use the environment variables in your script
npx supabase gen types typescript --project-id $NEXT_PUBLIC_PROJECT_ID --schema public > src/types/supabase.ts
