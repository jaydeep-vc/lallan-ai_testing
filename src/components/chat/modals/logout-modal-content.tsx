import Modal from "@/components/ui/modal";
import { LogoutIcon } from "@/components/icons/logout-icon";
export interface LogoutModalContentProps {
  onCancel: () => void;
}

export default function LogoutModalContent({ onCancel }: LogoutModalContentProps) {
  return (
    <Modal.Container>
      <Modal.Upper>
        <div
          className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}
        >
          <LogoutIcon className={`h-6 w-6 stroke-red-900`} />
        </div>

        <Modal.Content>
          <Modal.Title>Account Logout</Modal.Title>
          <Modal.Message>
            Are you sure you want to log out ? After logout you can not see your channels.
          </Modal.Message>
        </Modal.Content>
      </Modal.Upper>

      <Modal.Bottom>
        <form action="/auth/signout" method="post">
          <Modal.Button intent="danger" type="submit">
            Yes, Sure
          </Modal.Button>
        </form>
        <Modal.Button onClick={onCancel}>Cancel</Modal.Button>
      </Modal.Bottom>
    </Modal.Container>
  );
}
