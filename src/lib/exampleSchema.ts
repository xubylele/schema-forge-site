export const EXAMPLE_SCHEMA = `table users {
  id uuid pk
  email varchar unique
  name varchar
  org_id uuid
  created_at timestamptz
}

table posts {
  id uuid pk
  user_id uuid fk users.id
  title text
  body text nullable
  published boolean default false
  created_at timestamptz
}

view user_posts as
select p.id, p.title, p.user_id
from posts p

index idx_users_org_email on users
columns org_id, email
unique
`;
