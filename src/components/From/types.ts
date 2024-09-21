import { InjectionKey } from "vue";
import type {RuleItem,ValidateError,ValidateFieldsError} from 'async-validator'
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormItemProps {
    label: string
    prop?:string 
}
export interface FromItemRule extends RuleItem {
    trigger?:string;
}
export type FromRules = Record<string ,FromItemRule[] >;
export interface FromProps {
    // 使用Record定义带有特定键值对的对象
    model: Record<string , any>;
    rules: FromRules;  
}

export interface FromContext extends FromProps{
    addField:(field: FromItemContext) => void;
    removeField:(field: FromItemContext) => void;

}
export interface FromItemContext {
    prop:string
    validate:(trigger?: string) => Promise<any>;
    resetField():void;
    clearValidate():void;
}
export interface FromValidateFailure{
    errors:ValidateError[] | null;
    fields:ValidateFieldsError
    
}
export interface FormInstance {
    validate:() => Promise<any>;
    resetFields: (props?:string[]) => void
    clearValidate: (props?:string[]) => void
}
// 限制了provide导出的数据类型必须是FromContext中的
export const fromContextKey: InjectionKey<FromContext> = Symbol('fromContextKey')
export const fromItemContextKey: InjectionKey<FromItemContext> = Symbol('fromItemContextKey')