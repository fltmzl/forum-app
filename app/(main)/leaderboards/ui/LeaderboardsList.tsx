"use client";

import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import LeaderboardItem from "../components/LeaderboardItem";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncReceiveLeaderboards } from "@/states/leaderboards/action";

const LeaderboardsList = () => {
  const leaderboards: Leaderboard[] = useAppSelector((states) => states.leaderboards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Stack>
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem key={index} ranking={++index} user={leaderboard.user} score={leaderboard.score} />
      ))}
    </Stack>
  );
};

export default LeaderboardsList;
