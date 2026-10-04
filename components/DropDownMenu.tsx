"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

type DropDownMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
};

export default function DropDownMenu({ onEdit, onDelete, className }: DropDownMenuProps) {
  const buttons = [
    { name: "Edit", icon: Pencil, onClick: onEdit },
    { name: "Delete", icon: Trash2, onClick: onDelete },

  ];

  return (
    <Menu as="div" className={className}>
      <MenuButton className="rounded-md p-1 text-text cursor-pointer ">
        <EllipsisVertical className="size-6 text-accent bg-button/50 rounded-full" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="rounded-md border border-accent bg-background p-1 shadow-md"
      >
        {buttons.map((button) => (
          <MenuItem key={button.name}>
            <button
              onClick={button.onClick}
              className="flex w-full items-center gap-2 rounded px-3 py-1.5 font-nunito text-text data-focus:bg-badges"
            >
              <button.icon className="size-4" />
              {button.name}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
