import prisma from "@/lib/prisma";
import { Livro, Prisma } from "@prisma/client";
import { z } from "zod";

const livroSchema = z.object({
    titulo: z.string()
        .min(1, 'O título deve ter pelo menos 1 caractere')
        .max(200, 'O título deve ter no máximo 200 caracteres'),
    autor: z.string()
        .min(1, 'O autor deve ter pelo menos 1 caractere')
        .max(200, 'O autor deve ter no máximo 200 caracteres'),
    quantit:y: z.number()
        .int('A quantidade deve ser um número inteiro')
        .min(0, 'A quantidade não pode ser negativa'),
});

export type LivroInput = z.infer<typeof livroSchema> & Prisma.LivroCreateInput;

export class LivroService {
    async getAllLivros(params: {
        skip?: number;
        limit?: number;
        where?: any;
        orderBy?: any;
    }): Promise<Livro[]> { 
        const { skip = 0, limit = 10, where, orderBy } = params;
        const livros = await prisma.livro.findMany({
            skip,
            take: limit,
        });
        return livros;
    }

    async getLivroById(id: string): Promise<Livro | null> {
        const livro = await prisma.livro.findUnique({
            where: { id },
        });
        return livro;
    }

    async createLivro(data: LivroInput): Promise<Livro> {
        const newlivro = data.quantidade > 0 ? await prisma.livro.create({
            data: {
                titulo: data.titulo,
                autor: data.autor,
                quantidade: data.quantidade,
            },
        }) : null;
        return newlivro;
    }

    async updateLivro(id: string, data: Prisma.LivroUpdateInput): Promise<Livro | null> {
        const updatedLivro = await prisma.livro.update({
            where: { id },
            data,
        });
        return updatedLivro;
    }

    async deleteLivro(id: string): Promise<Livro | null> {
        const deletedLivro = await prisma.livro.delete({
            where: { id },
        });
        return deletedLivro;
    }
}