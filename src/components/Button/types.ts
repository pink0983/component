import  type {PropType} from 'vue'
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'sumbit' | 'reset'

export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    nativeType?: NativeType;
    autofocus?: boolean;
    icons?: string;
    loading?: boolean;
}

export interface ButtonInstance {
    ref: HTMLButtonElement
}

export const buttonProps = {
    type:{
        type:String as PropType<ButtonType>
    },
    size:{
        type:String as PropType<ButtonSize>
    },
    nativeType:{
        type:String as PropType<NativeType>
    },
}