"use client";

import { useState } from "react";

type useInputReturn = [input: string, handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void, setInput: React.Dispatch<React.SetStateAction<string>>];

const useInput = (initialState = ""): useInputReturn => {
  const [input, setInput] = useState(initialState);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, handleChangeInput, setInput];
};

export default useInput;
