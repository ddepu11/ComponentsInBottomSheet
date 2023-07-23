import type { ComponentProps } from "react";
import type { Control, UseFormTrigger } from "react-hook-form";
import type { StyleProp, TextStyle, View, ViewStyle } from "react-native";

export type DropdownItemType = {
  label: string;
  value: string;
};

type CommonPropsType = {
  fieldName: string;
  control?: Control<any>;
  trigger?: UseFormTrigger<any>;
  label?: string;
  isRequired?: boolean;
  labelFont?: string;
};

export type DropDownPickerPropTypes = {
  items: DropdownItemType[];
  defaultValue?: string | number | (string | number)[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  onChange?: (value: string | number | (string | number)[]) => void;
  containerStyle?: StyleProp<ViewStyle>;
  dropDownStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  searchContainerStyle?: StyleProp<ViewStyle>;
  searchTextInputStyle?: StyleProp<TextStyle>;
  selectedItemLabelStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<ViewStyle>;
  arrowColor?: string;
  searchablePlaceholder?: string;
  maxHeight?: number;
  disabled?: boolean;
  disableLocalSearch?: boolean;
  height?: number;
  onItemSelect?: (fieldName: string, item: DropdownItemType) => void;
  wrapperZindex?: number;
  searchPlaceholder?: string;
  searchAndFetchMoreItems?: (keyword?: string, offset?: number) => void;
  refreshing?: boolean;
  dropdownHeight?: number;
} & CommonPropsType &
  ComponentProps<typeof View>;
