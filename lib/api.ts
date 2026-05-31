import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

export function successResponse<T>(data: T, meta?: ApiResponse["meta"]): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    error: null,
    meta,
  } satisfies ApiResponse<T>);
}

export function errorResponse(error: string, status: number = 400): NextResponse {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error,
    } satisfies ApiResponse,
    { status }
  );
}

export function paginationMeta(total: number, limit: number, cursor?: string | null) {
  return {
    total,
    limit,
    cursor: cursor ?? null,
  };
}
