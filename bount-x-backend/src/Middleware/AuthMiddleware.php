<?php

namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Server\MiddlewareInterface;

class AuthMiddleware implements MiddlewareInterface
{
    private $secretKey;

    public function __construct($secretKey)
    {
        $this->secretKey = $secretKey;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
            return $this->unauthorizedResponse();
        }

        list($jwt) = sscanf($authHeader, 'Bearer %s');

        if (!$jwt) {
            return $this->unauthorizedResponse();
        }

        try {
            $decoded = JWT::decode($jwt, $this->secretKey, ['HS256']);
            $request = $request->withAttribute('user', $decoded);
        } catch (ExpiredException $e) {
            return $this->unauthorizedResponse('Token has expired');
        } catch (SignatureInvalidException $e) {
            return $this->unauthorizedResponse('Invalid token signature');
        } catch (\Exception $e) {
            return $this->unauthorizedResponse('Authorization error');
        }

        return $handler->handle($request);
    }

    private function unauthorizedResponse($message = 'Unauthorized')
    {
        return (new \GuzzleHttp\Psr7\Response())
            ->withStatus(401)
            ->withHeader('Content-Type', 'application/json')
            ->withBody(\GuzzleHttp\Psr7\stream_for(json_encode(['error' => $message])));
    }
}