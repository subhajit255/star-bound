"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  getUsersRequest,
  selectUsers,
  selectUsersPagination,
  selectUsersStatus,
} from "@/store/slices/userSlice";

export default function UsersPage() {
  const dispatch = useDispatch();
  const usersList = useSelector(selectUsers);
  const pagination = useSelector(selectUsersPagination);
  const status = useSelector(selectUsersStatus);

  useEffect(() => {
    dispatch(getUsersRequest({ page: 1, size: 10 }));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-full">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9 bg-white border-border/60 rounded-lg focus-visible:ring-primary/20"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    className="bg-white border-border/60 text-muted-foreground font-normal justify-between w-[130px]"
                  />
                }
              >
                All Roles
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Roles</DropdownMenuItem>
                <DropdownMenuItem>Admin</DropdownMenuItem>
                <DropdownMenuItem>User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    className="bg-white border-border/60 text-muted-foreground font-normal justify-between w-[120px]"
                  />
                }
              >
                Active
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Status</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Inactive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Add User Button */}
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto rounded-full px-6">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-border/40 bg-white/70 backdrop-blur-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 backdrop-blur-sm border-b border-border/40">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-semibold text-slate-500 w-[250px] py-4">
                  User
                </TableHead>
                <TableHead className="font-semibold text-slate-500 py-4">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-slate-500 py-4">
                  Country
                </TableHead>
                <TableHead className="font-semibold text-slate-500 py-4">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-slate-500 py-4">
                  Joined On
                </TableHead>
                <TableHead className="font-semibold text-slate-500 py-4">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-500 text-right py-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status === "loading" ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-500" />
                  </TableCell>
                </TableRow>
              ) : !usersList || usersList.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-slate-500"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                usersList.map((user) => {
                  const isActive = user.isActive;
                  const statusText = isActive ? "Active" : "Inactive";

                  return (
                    <TableRow
                      key={user.id}
                      className="hover:bg-indigo-50/30 transition-colors duration-200 border-border/40 group"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border/40 shadow-sm ring-2 ring-transparent group-hover:ring-indigo-100 transition-all duration-300">
                            <AvatarImage
                              src={user.profileImage || ""}
                              alt={user.name}
                            />
                            <AvatarFallback className="bg-indigo-50 text-indigo-600">
                              {user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-slate-700">
                            {user.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-500 font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-slate-500">-</TableCell>
                      <TableCell className="text-slate-500">
                        {user.role?.name || "User"}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold inline-flex items-center justify-center px-3 py-1 rounded-full text-xs shadow-sm ${
                            isActive
                              ? "text-emerald-600 bg-emerald-50 border border-emerald-100"
                              : "text-rose-600 bg-rose-50 border border-rose-100"
                          }`}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                          )}
                          {!isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
                          )}
                          {statusText}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-border/50 p-4 bg-white">
          <p className="text-sm text-slate-500">
            Showing page {pagination.page} of {pagination.totalPages} (
            {pagination.total} users total)
          </p>
          <Pagination className="mx-0 w-auto">
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className={pagination.page <= 1 ? "pointer-events-none opacity-50" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.page > 1) {
                      dispatch(getUsersRequest({ page: pagination.page - 1, size: pagination.size }));
                    }
                  }}
                />
              </PaginationItem>
              
              {/* Dynamic Page Links */}
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                // simple logic to show up to 5 pages
                let startPage = Math.max(1, pagination.page - 2);
                if (startPage + 4 > pagination.totalPages) {
                  startPage = Math.max(1, pagination.totalPages - 4);
                }
                const pageNum = startPage + i;
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={pageNum === pagination.page}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(getUsersRequest({ page: pageNum, size: pagination.size }));
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  className={pagination.page >= pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.page < pagination.totalPages) {
                      dispatch(getUsersRequest({ page: pagination.page + 1, size: pagination.size }));
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
