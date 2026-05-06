"use client";

import { useAppselector } from "@/src/lib/store/hooks";

function Teacher() {
  const { teacherName, teacherPassword } = useAppselector(
    (store) => store.teacherSlice,
  );
  return (
    <div>
      <h1>teacher</h1>
    </div>
  );
}
export default Teacher;
