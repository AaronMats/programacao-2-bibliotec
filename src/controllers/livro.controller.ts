import { Request, Response } from "express";
import { Livro, LivroService } from "@/services/livro.service";

export class LivroController {
  private livroService: LivroService;

  constructor() {
    this.livroService = new LivroService();
  }

  public getAllLivros = async (req: Request, res: Response): Promise<void> => {
    try {
      const { skip, limit, where, orderBy } = req.query as any;
      const livros = await this.livroService.getAllLivros({
        page: Number(skip),
        limit: Number(limit),
        where,
        orderBy
      });
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getLivroById = async (req: Request, res: Response): Promise<void> => {
    try {
      const livroId = req.params.id as string;
      const livro = await this.livroService.getLivroById(livroId);
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public createLivro = async (req: Request, res: Response): Promise<void> => {
    try {
      const livroData = req.body as Livro;
      const novoLivro = await this.livroService.createLivro(livroData);
      res.status(201).json(novoLivro);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public updateLivro = async (req: Request, res: Response): Promise<void> => {
    try {
      const livroId = req.params.id as string;
      const livroData = req.body as Livro;
      const livroAtualizado = await this.livroService.updateLivro(livroId, livroData);
      res.status(200).json(livroAtualizado);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public deleteLivro = async (req: Request, res: Response): Promise<void> => {
    try {
      const livroId = req.params.id as string;
      await this.livroService.deleteLivro(livroId);
      res.status(200).json({ message: "Livro excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}