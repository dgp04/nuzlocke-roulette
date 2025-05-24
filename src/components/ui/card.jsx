import * as React from "react"


function Card({
  ...props
}) {
  return (
    <div
      data-slot="card"
      className={
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"}
      {...props} />
  );
}

function CardHeader({
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"}
      {...props} />
  );
}

function CardTitle({
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={"leading-none font-semibold"}
      {...props} />
  );
}

function CardDescription({
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={"text-muted-foreground text-sm"}
      {...props} />
  );
}

function CardAction({
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end"}
      {...props} />
  );
}

function CardContent({
  ...props
}) {
  return (<div data-slot="card-content" className={"px-6"} {...props} />);
}

function CardFooter({
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={"flex items-center px-6 [.border-t]:pt-6"} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
