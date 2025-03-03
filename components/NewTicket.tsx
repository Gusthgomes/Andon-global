"use client";

import React, { useEffect, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { toast } from "@/hooks/use-toast";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ticketschema, TicketFormData } from '@/lib/validations';
import { Minus, Plus } from 'lucide-react';

import { useRouter } from "next/navigation";

type formData = z.infer<typeof ticketschema>;


const NewTicket = () => {

    const [userUid, setUserUid] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/sign-in");
            } else {
                setUserUid(user.uid);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        control,
    } = useForm<formData>({
        mode: "all",
        criteriaMode: "all",
        resolver: zodResolver(ticketschema),
    });
    const { fields, append, remove } = useFieldArray({
        name: "ticketItem",
        control,
    });

    const createTicket = useMutation(api.tickets.createTicket);

    const onSubmit = async (data: TicketFormData) => {
        try {

            await createTicket({
                number: data.number,
                kit: data.kit,
                area: data.area,
                line: data.line,
                posto: data.posto,
                motivo: data.motivo,
                ticketItem: data.ticketItem,
                status: "Aberto",
                createdAt: Date.now(),
                updatedAt: Date.now(),
                userId: userUid || "",
            });

            reset();
            toast({
                title: "Sucesso!",
                description: "Ticket cadastrado com sucesso!",
            });
        } catch (error: string | any) {
            console.error("Erro ao criar ticket:", error);
            toast({
                title: "Erro ao cadastrar ticket!",
                variant: "destructive",
            });
        }
    };


    return (
        <>
            <div className="flex flex-col items-center justify-center gap-3">
                <Card className="flex flex-col items-center justify-center">
                    <CardHeader>
                        <CardTitle className='text-center text-4xl font-semibold'>
                            Cadastre um novo ticket
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <Input
                                        {...register("number")}
                                        type="text"
                                        placeholder='204344'
                                        maxLength={7}
                                        className='w-full text-center outline-none'
                                    />
                                </div>

                                <Controller
                                    name="kit"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="KIT" />
                                            </SelectTrigger>
                                            <SelectContent className="w-52">
                                                <SelectGroup>
                                                    <SelectItem value="KIT 3A">KIT 3A</SelectItem>
                                                    <SelectItem value="KIT 3B">KIT 3B</SelectItem>
                                                    <SelectItem value="KIT 3C">KIT 3C</SelectItem>
                                                    <SelectItem value="KIT 3E">KIT 3E</SelectItem>
                                                    <SelectItem value="KIT 3I">KIT 3I</SelectItem>
                                                    <SelectItem value="KIT 3J">KIT 3J</SelectItem>
                                                    <SelectItem value="KIT 3K">KIT 3K</SelectItem>
                                                    <SelectItem value="KIT 3R">KIT 3R</SelectItem>
                                                    <SelectItem value="KIT 3T">KIT 3T</SelectItem>
                                                    <SelectItem value="KIT 3W">KIT 3W</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                <Controller
                                    name="area"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Área" />
                                            </SelectTrigger>
                                            <SelectContent className="w-52">
                                                <SelectGroup>
                                                    <SelectItem value="BAAJ">BAAJ</SelectItem>
                                                    <SelectItem value="SMEL">SMEL</SelectItem>
                                                    <SelectItem value="SQDC">SQDC</SelectItem>
                                                    <SelectItem value="TESTE INT">TESTE INT</SelectItem>
                                                    <SelectItem value="EMBALAGEM">EMBALAGEM</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                <Controller
                                    name="line"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Modelo" />
                                            </SelectTrigger>
                                            <SelectContent className="w-52">
                                                <SelectGroup>
                                                    <SelectItem value="PTE">PTE</SelectItem>
                                                    <SelectItem value="PCO">PCO</SelectItem>
                                                    <SelectItem value="PFI">PFI</SelectItem>
                                                    <SelectItem value="ZETE">ZETE</SelectItem>
                                                    <SelectItem value="DIV">DIV</SelectItem>
                                                    <SelectItem value="M25">M25</SelectItem>
                                                    <SelectItem value="M27">M27</SelectItem>
                                                    <SelectItem value="M28">M28</SelectItem>
                                                    <SelectItem value="M29">M29</SelectItem>
                                                    <SelectItem value="M30">M30</SelectItem>
                                                    <SelectItem value="M31">M31</SelectItem>
                                                    <SelectItem value="M33">M33</SelectItem>
                                                    <SelectItem value="M73">M73</SelectItem>
                                                    <SelectItem value="M74">M74</SelectItem>
                                                    <SelectItem value="M75">M75</SelectItem>
                                                    <SelectItem value="M77">M77</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                <Controller
                                    name="posto"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Posto" />
                                            </SelectTrigger>
                                            <SelectContent className="w-52">
                                                <SelectGroup>
                                                    <SelectItem value="BAME 14-1">BAME 14-1</SelectItem>
                                                    <SelectItem value="BAME 14-2">BAME 14-2</SelectItem>
                                                    <SelectItem value="BAME 15-1">BAME 15-1</SelectItem>
                                                    <SelectItem value="BAME 15-2">BAME 15-2</SelectItem>
                                                    <SelectItem value="BAME 16-1">BAME 16-1</SelectItem>
                                                    <SelectItem value="BAME 16-2">BAME 16-2</SelectItem>
                                                    <SelectItem value="BAME 17-1">BAME 17-1</SelectItem>
                                                    <SelectItem value="BAME 17-2">BAME 17-2</SelectItem>
                                                    <SelectItem value="BAAJ-ARM">BAAJ-ARM</SelectItem>
                                                    <SelectItem value="BAAJ-DIV">BAAJ-DIV</SelectItem>
                                                    <SelectItem value="BAME SYN">BAME SYN</SelectItem>
                                                    <SelectItem value="BAME 73">BAME 73</SelectItem>
                                                    <SelectItem value="BAME 75">BAME 75</SelectItem>
                                                    <SelectItem value="BAME 25">BAME 25</SelectItem>
                                                    <SelectItem value="EMBALAGEM">EMBALAGEM</SelectItem>
                                                    <SelectItem value="TPAINEL">TPAINEL</SelectItem>
                                                    <SelectItem value="BANCA 1">BANCA 1</SelectItem>
                                                    <SelectItem value="BANCA 2">BANCA 2</SelectItem>
                                                    <SelectItem value="BANCA 3">BANCA 3</SelectItem>
                                                    <SelectItem value="BANCA 4">BANCA 4</SelectItem>
                                                    <SelectItem value="BANCA 5">BANCA 5</SelectItem>
                                                    <SelectItem value="BANCA 6">BANCA 6</SelectItem>
                                                    <SelectItem value="BANCA 7">BANCA 7</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                <Controller
                                    name="motivo"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Motivo" />
                                            </SelectTrigger>
                                            <SelectContent className="w-52">
                                                <SelectGroup>
                                                    <SelectItem value="Esquecimento">Esquecimento</SelectItem>
                                                    <SelectItem value="F.Identificada">
                                                        F.Identificada
                                                    </SelectItem>
                                                    <SelectItem value="Item Trocado">Item Trocado</SelectItem>
                                                    <SelectItem value="NCR">NCR</SelectItem>
                                                    <SelectItem value="RM">RM</SelectItem>
                                                    <SelectItem value="Saldo">Saldo</SelectItem>
                                                    <SelectItem value="Kanban zerado">Kanban zerado</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col py-2">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="flex items-center justify-center w-full"
                                    >
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-[200px] md:w-[600px]">
                                            <div className="flex flex-col text-center">
                                                <Input
                                                    className="w-52 rounded text-lg text-center outline-none mt-2 md:mt-0"
                                                    type="text"
                                                    {...register(`ticketItem.${index}.item`)}
                                                    placeholder="3X.0855...."
                                                />

                                                {errors?.ticketItem && (
                                                    <p className="p-0 m-0 text-[0.50rem] font-semibold text-white">
                                                        {errors.ticketItem[index]?.item?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col text-center">
                                                <Input
                                                    type="text"
                                                    className="w-20 rounded text-lg text-center outline-none"
                                                    {...register(`ticketItem.${index}.quantity`)}
                                                    placeholder="1"
                                                />
                                                {errors?.ticketItem && (
                                                    <p className="p-0 text-[0.50rem] font-semibold text-white">
                                                        {errors.ticketItem[index]?.quantity?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col text-center">
                                                <Input
                                                    className="w-48 rounded text-lg text-center outline-none uppercase"
                                                    type="text"
                                                    {...register(`ticketItem.${index}.description`)}
                                                    placeholder="Rabicho 1,5m..."
                                                />
                                                {errors?.ticketItem && (
                                                    <p className="m-0 p-0 text-[0.50rem] font-semibold text-white">
                                                        {errors.ticketItem[index]?.description?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => remove(index)}
                                                type="button"
                                                className="bg-red-500 rounded p-2 my-5 w-8 flex"
                                            >
                                                <Minus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="bg-green-500 rounded p-2 w-full flex"
                                onClick={() =>
                                    append({
                                        item: "",
                                        quantity: "",
                                        description: "",
                                    })
                                }
                            >
                                <Plus size={18} className="flex mx-auto" />
                            </button>

                            {fields.length >= 1 && (
                                <Button type="submit" className="w-full py-4 my-5">
                                    Cadastrar
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default NewTicket