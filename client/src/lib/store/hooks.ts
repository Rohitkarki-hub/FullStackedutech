import { useDispatch, useSelector } from "react-redux";
import { appDispatch } from "./store";
import { RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<appDispatch>();

export const useAppselector = useSelector.withTypes<RootState>();
