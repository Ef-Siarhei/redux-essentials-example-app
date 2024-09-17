// Этот файл служит центральным узлом для повторного экспорта предварительно набранных Redux hooks

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store";

// Использывать во всем приложении вместо простых `useDispatch` и `useSelector`.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
