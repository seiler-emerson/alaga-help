import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
    title: string
    message: string
    needButton: boolean
}

export const Alert = ({ open, setOpen, title, message, needButton }: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="z-[1000]">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {needButton &&
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setOpen(false)}>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                }
            </AlertDialogContent>
        </AlertDialog>
    );
};