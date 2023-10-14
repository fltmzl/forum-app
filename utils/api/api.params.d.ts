type UserRegisterParams = {
  name: string;
  email: string;
  password: string;
};

type UserLoginParams = {
  email: string;
  password: string;
};

type CreateThreadParams = {
  title: string;
  body: string;
  category?: string;
};

type CreateCommentParams = {
  threadId: string;
  content: string;
};
