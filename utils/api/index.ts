import Cookies from "js-cookie";

const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";

  function putAccessToken(token: string) {
    return Cookies.set("accessToken", token, {
      expires: 7,
    });
  }

  function getAccessToken() {
    return Cookies.get("accessToken");
  }

  async function register({ name, email, password }: UserRegisterParams): Promise<User> {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const resJson: RegisterUserApiResponse = await res.json();
    const { status, message } = resJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const { user } = resJson.data;
    return user;
  }

  async function login({ email, password }: UserLoginParams): Promise<string> {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resJson: LoginUserApiResponse = await res.json();
    const { status, message } = resJson;

    if (status !== "success") throw new Error(message);
    const { token } = resJson.data;

    return token;
  }

  async function getAllUsers(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`);
    const resJson: GetAllUsersResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { users } = resJson.data;

    return users;
  }

  const _fetchWithAuth = (url: string, options?: RequestInit) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  };

  async function getOwnProfile(): Promise<User> {
    const res = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const resJson: GetOwnProfileResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { user } = resJson.data;

    return user;
  }

  async function verifyAccessToken(accessToken: string) {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resJson: GetOwnProfileResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { user } = resJson.data;

    return user;
  }

  async function createThread({ body, title, category }: CreateThreadParams): Promise<Thread> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const resJson: CreateThreadResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { thread } = resJson.data;

    return thread;
  }

  async function getAllThreads(): Promise<Thread[]> {
    const res = await fetch(`${BASE_URL}/threads`);
    const resJson: GetAllThreadsResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { threads } = resJson.data;

    return threads;
  }

  async function getDetailThread(threadId: string): Promise<DetailThread> {
    const res = await fetch(`${BASE_URL}/threads/${threadId}`);
    const resJson: GetDetailThreadResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { detailThread } = resJson.data;

    return detailThread;
  }

  async function createComment({ content, threadId }: CreateCommentParams): Promise<CommentThread> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    const resJson: CreateCommentResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { comment } = resJson.data;

    return comment;
  }

  async function upVoteThread(threadId: string): Promise<UpVoteThread> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: "POST",
    });

    const resJson: UpVoteThreadResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { vote } = resJson.data;

    return vote;
  }

  async function downVoteThread(threadId: string): Promise<DownVoteThread> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: "POST",
    });

    const resJson: DownVoteThreadResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { vote } = resJson.data;

    return vote;
  }

  async function neutralizeVoteThread(threadId: string): Promise<NeutralizeVoteThread> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: "POST",
    });

    const resJson: NeutralizeVoteThreadResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { vote } = resJson.data;

    return vote;
  }

  async function upVoteComment(threadId: string, commentId: string): Promise<UpVoteComment> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: "POST",
    });

    const resJson: UpVoteCommentResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { vote } = resJson.data;

    return vote;
  }

  async function downVoteComment(threadId: string, commentId: string): Promise<DownVoteComment> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: "POST",
    });

    const resJson: DownVoteCommentResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { vote } = resJson.data;

    return vote;
  }

  async function neutralizeVoteComment(threadId: string, commentId: string): Promise<NeutralizeVoteComment> {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: "POST",
    });

    const resJson: NeutralizeVoteCommentResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { vote } = resJson.data;

    return vote;
  }

  async function getLeaderboards(): Promise<Leaderboard[]> {
    const res = await fetch(`${BASE_URL}/leaderboards`);
    const resJson: LeaderboardsResponse = await res.json();

    const { status, message } = resJson;
    if (status !== "success") throw new Error(message);

    const { leaderboards } = resJson.data;

    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    verifyAccessToken,
    createThread,
    getAllThreads,
    getDetailThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;
