interface ApiResponse {
  status: string;
  message: string;
  data: any;
}

interface RegisterUserApiResponse extends ApiResponse {
  data: {
    user: User;
  };
}

interface LoginUserApiResponse extends ApiResponse {
  data: {
    token: string;
  };
}

interface GetAllUsersResponse extends ApiResponse {
  data: {
    users: User[];
  };
}

interface GetOwnProfileResponse extends ApiResponse {
  data: {
    user: User;
  };
}

interface CreateThreadResponse extends ApiResponse {
  data: {
    thread: Thread;
  };
}

interface GetAllThreadsResponse extends ApiResponse {
  data: {
    threads: Thread[];
  };
}

interface GetDetailThreadResponse extends ApiResponse {
  data: {
    detailThread: DetailThread;
  };
}

interface CreateCommentResponse extends ApiResponse {
  data: {
    comment: CommentThread;
  };
}

interface UpVoteThreadResponse extends ApiResponse {
  data: {
    vote: UpVoteThread;
  };
}

interface DownVoteThreadResponse extends ApiResponse {
  data: {
    vote: DownVoteThread;
  };
}

interface NeutralizeVoteThreadResponse extends ApiResponse {
  data: {
    vote: NeutralizeVoteThread;
  };
}

interface UpVoteCommentResponse extends ApiResponse {
  data: {
    vote: UpVoteComment;
  };
}

interface DownVoteCommentResponse extends ApiResponse {
  data: {
    vote: DownVoteComment;
  };
}

interface NeutralizeVoteCommentResponse extends ApiResponse {
  data: {
    vote: NeutralizeVoteComment;
  };
}

interface LeaderboardsResponse extends ApiResponse {
  data: {
    leaderboards: Leaderboards;
  };
}
