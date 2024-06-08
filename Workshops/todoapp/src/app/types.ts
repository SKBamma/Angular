export default interface ITodo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export interface GetResponseType {
    todos: ITodo[];
    total: number;
    skip: number;
    limit: number;
}