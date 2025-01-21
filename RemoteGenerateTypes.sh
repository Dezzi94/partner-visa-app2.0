# Ask for the project id in std-io:
read -p "Enter the project id for your online supabase project: " project_id
supabase gen types --lang=typescript --project-id $project_id --schema public > ./client/types/types.ts