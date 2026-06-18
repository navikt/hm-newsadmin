import {VStack, TextField, Textarea, Button, Link} from "@navikt/ds-react";
import {Route, Routes} from 'react-router-dom'

export const CreateNewsPage = () => {
    async function createNews(): Promise<NewsDTO[]> {
        const res = await fetch("http://localhost:8084/news", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.json()
    }
    type NewsDTO = {
        id: string
        title: string
        body: string
    }

    console.log(createNews())

    return (

        <VStack>
            <TextField label="Tittel"></TextField>
            <Textarea label="Innhold"></Textarea>
            <Button>
                <Link href='/'>Tilbake til forsiden</Link>
            </Button>
        </VStack>

    )

}