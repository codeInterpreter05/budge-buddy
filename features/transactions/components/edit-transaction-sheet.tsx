import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
 } from "@/components/ui/sheet"

import { TransactionForm } from "./transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transcation";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { Loader2, TrendingUp } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertTransactionSchema.omit({
    id: true
})

 type FormValues = z.input<typeof formSchema>;

 export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this Transaction"
    )

    const TransactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = TransactionQuery.isLoading;


    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    }

    const defaultValues = TransactionQuery.data ? {
        name: TransactionQuery.data.id,
    } : {
        name: "",
    }

    return (
      <>
        <ConfirmDialog />
          <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle>Edit Transaction</SheetTitle>
                    <SheetDescription>Edit an existing Transaction</SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (
                        <div className="absolute inst-0 flex items-center justify-center">
                            <Loader2 className="animate-spin size-4 text-muted-foreground" />
                        </div>
                    ) : (
                        <TransactionForm 
                        id={id}
                        onSubmit={onSubmit} 
                        disabled={isPending}
                        onDelete={onDelete}
                        />
                    )
                }
            </SheetContent>
        </Sheet>
      </>
    )
 }