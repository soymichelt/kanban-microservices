export abstract class UseCase<RequestType, ResponseType> {
  abstract run(request: RequestType): Promise<ResponseType>;
}
