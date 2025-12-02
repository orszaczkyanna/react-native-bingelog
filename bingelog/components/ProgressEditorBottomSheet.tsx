import React from "react";

interface Props {
  isVisible: boolean;
  initialValue?: string;
  onClose: () => void;
  onSave: (value: string | null) => void;
}

const ProgressEditorBottomSheet = ({
  isVisible,
  initialValue = "",
  onClose,
  onSave,
}: Props) => {
  return <></>;
};

export default ProgressEditorBottomSheet;
