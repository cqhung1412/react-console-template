import {
  createStyles,
  Title,
  Text,
  Button,
  AppShell,
  Group,
  rem,
} from "@mantine/core";
import { useNavigate, useRouteError } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function NotFoundTitle() {
  const { classes } = useStyles();
  const error = useRouteError() as { status: number; statusText: string };
  const navigate = useNavigate();

  console.error(error);
  return (
    <AppShell className={classes.root}>
      <div className={classes.label}>{error.status}</div>
      <Title className={classes.title}>{error.statusText}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, this is only a {error.status} page. You may have mistyped
        the address, or the page has been moved to another URL.
      </Text>
      <Group position="center">
        <Button
          variant="subtle"
          size="md"
          onClick={() => navigate(-1)}
        >
          Take me back
        </Button>
      </Group>
    </AppShell>
  );
}
