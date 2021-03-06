import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, CardContent, /* Button ,*/ Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

// import useRedeemOnMasonry from '../../hooks/useRedeemOnMasonry';
// import useStakedBalanceOnMasonry from '../../hooks/useStakedBalanceOnMasonry';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../hooks/useFetchMasonryAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnMasonry from '../../hooks/useTotalStakedOnMasonry';
// import useClaimRewardCheck from '../../hooks/masonry/useClaimRewardCheck';
// import useWithdrawCheck from '../../hooks/masonry/useWithdrawCheck';
import ProgressCountdown from './components/ProgressCountdown';
import { createGlobalStyle } from 'styled-components';

/* const BackgroundImage = createGlobalStyle`
  body, html {
    background: url(${MasonryImage}) no-repeat !important;
    background-size: cover !important;
  }
`; */

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
}));

const Masonry = () => {
  const classes = useStyles();
  const { account } = useWallet();
  // const { onRedeem } = useRedeemOnMasonry();
  // const stakedBalance = useStakedBalanceOnMasonry();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnMasonry();
  const masonryAPR = useFetchMasonryAPR();
  // const canClaimReward = useClaimRewardCheck();
  // const canWithdraw = useWithdrawCheck();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();

  return (
    < Page >
      {!!account ? (
        <>
          <Typography color="primary.black" align="center" variant="h3" gutterBottom>
            Boardroom
          </Typography>
          <Box mt={5}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card style={{ background: '#fff', borderRadius: '15px' }} className={classes.gridItem}>
                  <CardContent>
                    <h3 style={{ margin: '10px', textAlign: 'center', color: '#000', fontSize: '18px' }}>Next Epoch</h3>
                    <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card style={{ background: '#fff', borderRadius: '15px' }} className={classes.gridItem}>
                  <CardContent align="center">
                    <h3 style={{ margin: '10px', textAlign: 'center', color: '#000', fontSize: '18px' }}>Current Epoch</h3>
                    <h2 style={{ fontWeight: 'lighter', display: 'flex', fontSize: '1.5rem', marginTop: '8px', justifyContent:'center' }}>{Number(currentEpoch)}</h2>

                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
                <Card style={{ background: '#fff', borderRadius: '15px' }} className={classes.gridItem}>
                  <CardContent align="center">
                    <h3 style={{ margin: '10px', textAlign: 'center', color: '#000', fontSize: '18px' }}>
                      Current TWAP
                    </h3>
                    <h2 style={{ fontWeight: 'lighter', display: 'flex', fontSize: '1.5rem', marginTop: '8px', justifyContent:'center' }}>{scalingFactor}</h2>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
                <Card style={{ background: '#fff', borderRadius: '15px' }} className={classes.gridItem}>
                  <CardContent align="center">
                    {/* <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}> */}
{/*                       <Grid xs={4}>

                        <h3 style={{ margin: '10px', textAlign: 'center', color: '#000', fontSize: '18px' }}>APR</h3>
                        <h2 style={{ fontWeight: 'lighter', display: 'flex', fontSize: '1.5rem', marginTop: '8px', justifyContent:'center' }}>{masonryAPR.toFixed(2)}%</h2>
                      </Grid> */}
                      {/* <Grid xs={4}> */}

                        <h3 style={{ margin: '10px', textAlign: 'center', color: '#000', fontSize: '18px' }}>Daily APR</h3>
                        <h2 style={{ fontWeight: 'lighter', display: 'flex', fontSize: '1.5rem', marginTop: '8px', justifyContent:'center' }}>{(masonryAPR / 365).toFixed(2)}%</h2>
                      {/* </Grid> */}

{/*                       <Grid xs={4}>

                        <h3 style={{ margin: '10px', textAlign: 'center', color: '#000', fontSize: '18px' }}>Epoch</h3>
                        <h2 style={{ fontWeight: 'lighter', display: 'flex', fontSize: '1.5rem', marginTop: '8px', justifyContent:'center' }}>{(masonryAPR / 365 / 4).toFixed(2)}%</h2>
                      </Grid> */}


                    {/* </Grid> */}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Card style={{ background: '#fff', borderRadius: '15px' }} className={classes.gridItem}>
                  <CardContent align="center">
                    <h3 style={{ margin: '10px', textAlign: 'center', color: '#000', fontSize: '18px' }}>STRAW Staked</h3>
                    <h2 style={{ fontWeight: 'lighter', display: 'flex', fontSize: '1.5rem', marginTop: '8px', justifyContent:'center' }}>{getDisplayBalance(totalStaked)}</h2>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>


            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper>
                  <Spacer />
                  <StyledCardWrapper>
                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>

            {/* <Grid container justify="center" spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent align="center">
                  <Typography>Rewards</Typography>

                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button color="primary" variant="outlined">Claim Reward</Button>
                </CardActions>
                <CardContent align="center">
                  <Typography>Claim Countdown</Typography>
                  <Typography>00:00:00</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent align="center">
                  <Typography>Stakings</Typography>
                  <Typography>{getDisplayBalance(stakedBalance)}</Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button>+</Button>
                  <Button>-</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid> */}
          </Box>
        </>
      ) : (
        <UnlockWallet />
      )
      }
    </Page >
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Masonry;
