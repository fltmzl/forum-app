"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/states";

export const useAppDispatch: () => AppDispatch = useDispatch;
