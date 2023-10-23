interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
}

interface ThreadItem extends Omit<Thread, "ownerId"> {
  owner: User | undefined;
}

type Owner = {
  id: string;
  name: string;
  avatar: string;
};

type CommentThread = {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
};

interface DetailThread extends Omit<Thread, "ownerId" | "totalComments"> {
  owner: Owner;
  comments: CommentThread[];
}

interface Vote {
  id: string;
  userId: string;
}

interface VoteThread extends Vote {
  threadId: string;
}

interface UpVoteThread extends VoteThread {
  voteType: 1;
}

interface DownVoteThread extends VoteThread {
  voteType: -1;
}

interface NeutralizeVoteThread extends VoteThread {
  voteType: 0;
}

interface VoteComment extends Vote {
  commentId: string;
}

interface UpVoteComment extends VoteComment {
  voteType: 1;
}

interface DownVoteComment extends VoteComment {
  voteType: -1;
}

interface NeutralizeVoteComment extends VoteComment {
  voteType: 0;
}

type Leaderboard = {
  user: User;
  score: number;
};
