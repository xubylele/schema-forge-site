export const EXAMPLE_SCHEMA = `table users {
  id uuid pk
  email varchar unique
  name varchar
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
`;
