import { Close, Provider, Root, Title, Viewport } from "@radix-ui/react-toast";
import { Cross1Icon } from "@radix-ui/react-icons";

const Toast = ({ title, showToast, setShowToast, delay = 3000 }: {
  title: string;
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
  delay?: number;
}) => {
  return (
    <Provider duration={delay}>
      <Root
        className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={showToast}
        onOpenChange={setShowToast}
      >
        <Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          {title}
        </Title>
        <Close aria-label="close">
          <Cross1Icon />
        </Close>
      </Root>
      <Viewport className="[--viewport-padding:_25px] fixed bottom-0 left-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Provider>
  );
};

export default Toast;
