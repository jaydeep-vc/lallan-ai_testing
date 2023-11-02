import React, { ReactNode } from "react";

export interface SwitchProps {
  children: ReactNode;
  /**
   * @augments describe it is only to show message in the frontend/the calling component
   */
  describe?: string;
}

export default function Switch({ children }: SwitchProps) {
  let matchCase: any = null;
  let defaultCase: any = null;

  React.Children.forEach(children, (child: any) => {
    if (!matchCase && child.type === Case) {
      const { condition } = child.props;

      const conditionResult = Boolean(condition);

      if (conditionResult) {
        matchCase = child;
      }
    } else if (!defaultCase && child.type === Default) {
      defaultCase = child;
    }
  });

  return matchCase ?? defaultCase ?? null;
}

export const Case = ({ children, condition }: { children: ReactNode; condition: boolean }) => {
  return children;
};

export const Default = ({ children }: React.PropsWithChildren) => {
  return children;
};
