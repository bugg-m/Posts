import React, { useContext } from "react";
import { Context } from "../../main";
import LinearProgress from "@mui/material/LinearProgress";

export const Profile = () => {
  const { loading, user } = useContext(Context);
  return (
    <>
      <div className="bg-gray-50 py-[100px] md:py-0 min-h-screen dark:bg-gray-900">
        {loading ? (
          <LinearProgress />
        ) : (
          <div className="flex w-3/4 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full gap-2 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Profile
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Name : {user.name}
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email : {user.email}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
