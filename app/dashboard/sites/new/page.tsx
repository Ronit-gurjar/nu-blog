import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSiteRoute(){
    return(
    <div className="flex flex-col flex-1 items-center justify-center">
        <Card>
            <CardHeader>
                <CardTitle>Create Site</CardTitle>
                <CardDescription>
                Create your Site here. Click the button below once your done...
                </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col gap-y-6">
                <div className="grid gap-2">
                    <Label>Site</Label>
                    <Input placeholder="Site Name" />
                </div>
                <div className="grid gap-2">
                    <Label>Subdirectory</Label>
                    <Input placeholder="Subdirectory Name" />
                </div>
                <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea placeholder="A Description for your site" />
                </div>     
            </div>
            </CardContent>
            <CardFooter>
                <Button>Create</Button>
            </CardFooter>
        </Card>
    </div>
    )
}