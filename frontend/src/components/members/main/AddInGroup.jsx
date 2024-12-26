import React, { useEffect, useState } from "react";
import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useUser } from "./../../hook/use-user";

const AddInGroup = ({ groupId }) => {
  const { user } = useUser();
  const [inviteMode, setInviteMode] = useState(false);
  const [inviteMail, setInviteMail] = useState({ mail: "" });

  const handleSendInvitation = (e) => {
    e.preventDefault();
    const username = user?.username;
    fetch(`http://localhost:3333/${groupId}/invite`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: inviteMail.mail,
        user: username,
      }),
    }).then(() => setInviteMode(false));
  };
  return (
    <div className="flex flex-col items-center pb-10">
      <h1>Invite People to join Group And</h1>
      <span>Manage your expenses with your roomate more easily </span>
      <button
        onClick={() => setInviteMode(!inviteMode)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 "
      >
        Add Members
      </button>

      {inviteMode ? (
        <>
          <form onSubmit={handleSendInvitation}>
            <Field color="black" className="w-full  ">
              <Label className="text-sm/6 w-full font-medium text-white">
                Email
              </Label>
              <Description className="text-sm/6 text-black">
                Enter the email address
              </Description>
              <Input
                type="email"
                onChange={(e) =>
                  setInviteMail({
                    mail: e.target.value,
                  })
                }
                className={clsx(
                  "  mt-3 block w-full rounded-lg border-none bg-black py-1.5 px-1 text-sm/6 text-white",
                  " data-[focus]:outline-2 2 data-[focus]:outline-white/25"
                )}
              />
              <button
                type="submit"
                className="rounded-full shadow-lg text-sm border-2 border-primary px-6 py-2 hover:text-white hover:bg-gray-800 font-medium uppercase transition"
              >
                Send
              </button>
            </Field>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddInGroup;
