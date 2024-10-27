import { z } from "zod";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/select"
import { insertTransactionSchema } from "@/db/schema";
import { 
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
 } from "@/components/ui/form"

 const formSchema = z.object({
   date: z.coerce.date(),
   accountId: z.string(),
   categoryId: z.string().nullable().optional(),
   payee: z.string(),
   amount: z.string(),
   notes: z.string().optional(),    
 })

 const ApiFormSchema = insertTransactionSchema.omit({
    id: true,
 })

 type FormValues = z.input<typeof formSchema>;
 type ApiFormValues = z.input<typeof ApiFormSchema>;

 type Props = {
    id?: string,
    defaultValues?: FormValues,
    onSubmit: (values: FormValues) => void,
    onDelete?: () => void,
    disabled?: boolean,
    accountOptions: { label: string; value: string; }[];
    categoryOptions: { label: string; value: string; }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void; 
 }

 export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory,
 }: Props) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const handleSubmit = (values: FormValues) => {
         console.log({values})
        onSubmit(values)
    }

    const handleDelete = () => {
       onDelete?.();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 pt-4"
            >  

               
                <FormField
                 name="accountId"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Account
                        </FormLabel>
                        <FormControl>
                            <Select 
                              placeholder="Select an account"
                              options={accountOptions}
                              onCreate={onCreateAccount}
                              value={field.value}
                              onChange={field.onChange}
                              disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                 )}
                 />
                 <FormField
                 name="categoryId"
                 control={form.control}
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Category
                        </FormLabel>
                        <FormControl>
                            <Select 
                              placeholder="Select a category"
                              options={categoryOptions}
                              onCreate={onCreateCategory}
                              value={field.value}
                              onChange={field.onChange}
                              disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                 )}
                 />
                 <Button className="w-full" disabled={disabled}>
                    {id ? "Save changes": "Create account"}
                 </Button>
                 {!!id && <Button 
                    type="button"
                    disabled={disabled}
                    onClick={handleDelete}
                    className="w-full flex justify-center gap-2"
                    size={"icon"}
                    variant={"outline"}
                 >
                    <TrashIcon className="size-4" />
                    <p>Delete account</p>
                 </Button>}
            </form>
        </Form>
    )
 }