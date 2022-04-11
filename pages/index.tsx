import type {NextPage} from "next";

import {useState} from "react";
import Image from "next/image";
import {Box, Grid, Stack, StackProps, Text} from "@chakra-ui/react";

import GROUPS from "../groups.json";

interface Chart {
  a1: null | string;
  a2: null | string;
  b1: null | string;
  b2: null | string;
  c1: null | string;
  c2: null | string;
  d1: null | string;
  d2: null | string;
  e1: null | string;
  e2: null | string;
  f1: null | string;
  f2: null | string;
  g1: null | string;
  g2: null | string;
  h1: null | string;
  h2: null | string;
  w1: null | string;
  w2: null | string;
  w3: null | string;
  w4: null | string;
  w5: null | string;
  w6: null | string;
  w7: null | string;
  w8: null | string;
  w9: null | string;
  w10: null | string;
  w11: null | string;
  w12: null | string;
  w13: null | string;
  w14: null | string;
  l13: null | string;
  l14: null | string;
}

interface TeamProps extends Omit<StackProps, "onClick"> {
  name: string | null;
  onClick?: (winner: string | null) => void;
}

const Team: React.VFC<TeamProps> = ({name, onClick, ...props}) => {
  if (name === null) {
    return (
      <Stack cursor={onClick ? "pointer" : "default"} direction="row" {...props}>
        <Box backgroundColor="gray.300" height="20px" width="24px" />;
        <Text fontWeight={500} textTransform="capitalize">
          ...
        </Text>
      </Stack>
    );
  }

  return (
    <Stack
      cursor={onClick ? "pointer" : "default"}
      direction="row"
      onClick={() => onClick?.(name)}
      {...props}
    >
      <Image alt={name} height={20} src={`/flags/${name}.svg`} width={24} />
      <Text fontWeight={500} textTransform="capitalize">
        {name}
      </Text>
    </Stack>
  );
};

interface MatchProps extends Omit<StackProps, "onClick" | "position"> {
  a: string | null;
  b: string | null;
  title?: string;
  onClick?: (winner: string | null, loser: string | null) => void;
}

const Match: React.VFC<MatchProps> = ({a, b, onClick, title, ...props}) => {
  return (
    <Stack alignItems="center" borderWidth={1} justifyContent="space-between" {...props}>
      {title && (
        <Text
          backgroundColor="blackAlpha.100"
          color="whiteAlpha.900"
          fontSize="xl"
          fontWeight={500}
          padding={2}
          textAlign="center"
          textTransform="uppercase"
          width="100%"
        >
          {title}
        </Text>
      )}
      <Stack alignItems="center" padding={4}>
        <Team name={a} onClick={() => onClick?.(a, b)} />
        <Team name={b} onClick={() => onClick?.(b, a)} />
      </Stack>
    </Stack>
  );
};

const Home: NextPage = () => {
  const [chart, setChart] = useState<Chart>(() => ({
    a1: null,
    a2: null,
    b1: null,
    b2: null,
    c1: null,
    c2: null,
    d1: null,
    d2: null,
    e1: null,
    e2: null,
    f1: null,
    f2: null,
    g1: null,
    g2: null,
    h1: null,
    h2: null,
    w1: null,
    w2: null,
    w3: null,
    w4: null,
    w5: null,
    w6: null,
    w7: null,
    w8: null,
    w9: null,
    w10: null,
    w11: null,
    w12: null,
    w13: null,
    w14: null,
    l13: null,
    l14: null,
  }));

  function handleSetChart(draft: Partial<Chart>) {
    setChart((chart) => ({...chart, ...draft}));
  }

  return (
    <>
      <Stack direction={{base: "column", xl: "row"}} margin="auto" marginBottom={4} spacing={4}>
        {GROUPS.map((group) => (
          <Stack key={group.id} borderWidth={1} flex={1}>
            <Text
              backgroundColor="blackAlpha.100"
              color="whiteAlpha.900"
              fontSize="xl"
              fontWeight={500}
              padding={2}
              textAlign="center"
              textTransform="uppercase"
              width="100%"
            >
              Group {group.id}
            </Text>
            <Stack padding={4}>
              {group.teams.map((team) => {
                const groupFirst = chart[`${group.id}1` as keyof Chart];
                const groupSecond = chart[`${group.id}2` as keyof Chart];
                const isFirst = groupFirst === team;
                const isSecond = groupSecond === team;

                return (
                  <Stack key={team} direction="row">
                    <Team
                      name={team}
                      opacity={groupFirst && groupSecond && !isFirst && !isSecond ? 0.5 : 1}
                      onClick={(team) => {
                        return !chart[`${group.id}1` as keyof Chart] &&
                          !chart[`${group.id}2` as keyof Chart]
                          ? handleSetChart({[`${group.id}1`]: team})
                          : chart[`${group.id}1` as keyof Chart] &&
                            !chart[`${group.id}2` as keyof Chart]
                          ? handleSetChart({[`${group.id}2`]: team})
                          : handleSetChart({[`${group.id}1`]: team, [`${group.id}2`]: null});
                      }}
                    />
                    {(isFirst || isSecond) && <Text color="gray.500">({isFirst ? 1 : 2})</Text>}
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Grid
        templateAreas={`
          "c1d2   .       .       .         .       .       b1a2"
          ".      w2w1    .       .         .       w3w4    .   "
          "a1b2   .       .       .         .       .       d1c2"
          ".      .       w9w10   w13w14    w11w12  .       .   "
          "e1f2   .       .       .         .       .       f1e2"
          ".      w5w6    .       l13l14    .       w7w8    .   "
          "g1h2   .       .       .         .       .       h1g2"
        `}
        templateColumns="repeat(7, 1fr)"
        templateRows="repeat(7, 1fr)"
      >
        <Match
          a={chart.c1}
          b={chart.d2}
          gridArea="c1d2"
          title="C1 VS D2"
          onClick={(team) => handleSetChart({w1: team})}
        />
        <Match
          a={chart.a1}
          b={chart.b2}
          gridArea="a1b2"
          title="A1 VS B2"
          onClick={(team) => handleSetChart({w2: team})}
        />
        <Match
          a={chart.e1}
          b={chart.f2}
          gridArea="e1f2"
          title="E1 VS F2"
          onClick={(team) => handleSetChart({w5: team})}
        />
        <Match
          a={chart.g1}
          b={chart.h2}
          gridArea="g1h2"
          title="G1 VS H2"
          onClick={(team) => handleSetChart({w6: team})}
        />
        <Match
          a={chart.w2}
          b={chart.w1}
          gridArea="w2w1"
          title="Quarter"
          onClick={(team) => handleSetChart({w9: team})}
        />
        <Match
          a={chart.w5}
          b={chart.w6}
          gridArea="w5w6"
          title="Quarter"
          onClick={(team) => handleSetChart({w10: team})}
        />
        <Match a={chart.w13} b={chart.w14} gridArea="w13w14" title="Final" />
        <Match
          a={chart.w9}
          b={chart.w10}
          gridArea="w9w10"
          title="Semi"
          onClick={(winner, loser) => handleSetChart({w13: winner, l13: loser})}
        />
        <Match
          a={chart.w11}
          b={chart.w12}
          gridArea="w11w12"
          title="Semi"
          onClick={(winner, loser) => handleSetChart({w14: winner, l14: loser})}
        />
        <Match a={chart.l13} b={chart.l14} gridArea="l13l14" title="3rd place" />
        <Match
          a={chart.w3}
          b={chart.w4}
          gridArea="w3w4"
          title="Quarter"
          onClick={(team) => handleSetChart({w11: team})}
        />
        <Match
          a={chart.w7}
          b={chart.w8}
          gridArea="w7w8"
          title="Quarter"
          onClick={(team) => handleSetChart({w12: team})}
        />
        <Match
          a={chart.b1}
          b={chart.a2}
          gridArea="b1a2"
          title="B1 VS A2"
          onClick={(team) => handleSetChart({w3: team})}
        />
        <Match
          a={chart.d1}
          b={chart.c2}
          gridArea="d1c2"
          title="D1 VS C2"
          onClick={(team) => handleSetChart({w4: team})}
        />
        <Match
          a={chart.f1}
          b={chart.e2}
          gridArea="f1e2"
          title="F1 VS E2"
          onClick={(team) => handleSetChart({w7: team})}
        />
        <Match
          a={chart.h1}
          b={chart.g2}
          gridArea="h1g2"
          title="H1 VS G2"
          onClick={(team) => handleSetChart({w8: team})}
        />
      </Grid>
    </>
  );
};

export default Home;
