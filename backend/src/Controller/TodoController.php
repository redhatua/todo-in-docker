<?php

namespace App\Controller;

use App\Entity\Todo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Routing\Annotation\Route;

class TodoController extends AbstractController {

    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;
    /**
     * @var array
     */
    private array $result = [];

    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }

    /**
     * @Route("/get", name="get_all")
     */
    public function getAction(): JsonResponse {
        $todos = $this->em->getRepository(Todo::class)->findAll();
        foreach ($todos as $todo) {
            /** var Todo $todo */
            $this->result[] = $this->setTodo($todo);
        }
        return $this->json([
            'todos' => $this->result,
        ]);
    }

    /**
     * @Route("/save", name="save_todo", methods={"POST"})
     */
    public function saveAction(
        Request $request
    ): Response {
        $data = json_decode($request->getContent(), true);
        $todo = new Todo();
        $todo->setName($data['name']);
        $todo->setContent($data['content']);
        return new Response('Saved');
    }

    /**
     * @Route("/del/{id}", name="delete_todo")
     */
    public function deleteAction(
        int $id
    ): Response {
        $todo = $this->em->getRepository(Todo::class)->findOneBy(['id' => $id]);
        if ($todo) {
            $this->em->remove($todo);
            $this->em->flush();
        }
        return new Response('Deleted');
    }

    /**
     * @Route("/ver", name="show_version")
     */
    public function versionAction(): JsonResponse {
        return $this->json(
            [
                'php'     => PHP_VERSION,
                'symfony' => Kernel::VERSION,
            ]
        );
    }

    private function setTodo(Todo $todo): array {
        return [
            'id'         => $todo->getId(),
            'name'       => $todo->getName(),
            'content'    => $todo->getContent(),
            'created_at' => $todo->getCreatedAt(),
        ];
    }
}
