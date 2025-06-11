import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const Social = () => {
  return (
    <div className="flex items-center gap-4">
      <Button
        type={"button"}
        variant={"outline"}
        className="hover:bg-secondary/80 flex-1 cursor-pointer gap-2"
        disabled
      >
        <FcGoogle />
        <span>Google</span>
      </Button>
      <Button
        type={"button"}
        variant={"outline"}
        className="hover:bg-secondary/80 flex-1 cursor-pointer gap-2"
        disabled
      >
        <FaGithub />
        <span>Github</span>
      </Button>
    </div>
  );
};

export default Social;
